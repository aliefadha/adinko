import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/umum";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const result = await db
		.select({
			id: schema.portfolio.id,
			kategoriId: schema.portfolio.kategoriId,
			kategoriNama: schema.kategori.nama,
			title: schema.portfolio.title,
			subtitle: schema.portfolio.subtitle,
			image: schema.portfolio.image,
			alamat: schema.portfolio.alamat,
			tahun: schema.portfolio.tahun,
			createdAt: schema.portfolio.createdAt,
		})
		.from(schema.portfolio)
		.leftJoin(
			schema.kategori,
			eq(schema.portfolio.kategoriId, schema.kategori.id),
		);

	const images = await db.select().from(schema.portfolioImage);

	const resultWithImages = result.map((p) => ({
		...p,
		images: images.filter((img) => img.portfolioId === p.id),
	}));

	return c.json({ data: resultWithImages });
});

app.get("/:id", async (c) => {
	const db = createDb();
	const { id } = c.req.param();
	const result = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));
	if (!result[0]) return c.json({ data: null }, 404);

	const images = await db
		.select()
		.from(schema.portfolioImage)
		.where(eq(schema.portfolioImage.portfolioId, id));

	return c.json({ data: { ...result[0], images } });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { kategoriId, title, subtitle, image, alamat, tahun, images } =
		await c.req.json();

	if (!kategoriId) return c.json({ error: "kategoriId is required" }, 400);
	if (!title) return c.json({ error: "title is required" }, 400);

	const id = randomUUID();
	const now = new Date();
	await db.insert(schema.portfolio).values({
		id,
		kategoriId,
		title,
		subtitle,
		image,
		alamat,
		tahun,
		createdAt: now,
	});

	if (images && Array.isArray(images)) {
		for (const img of images) {
			await db.insert(schema.portfolioImage).values({
				id: randomUUID(),
				portfolioId: id,
				image: img,
			});
		}
	}

	const created = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));
	const createdImages = await db
		.select()
		.from(schema.portfolioImage)
		.where(eq(schema.portfolioImage.portfolioId, id));

	return c.json({ data: { ...created[0], images: createdImages } }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { kategoriId, title, subtitle, image, alamat, tahun, images } =
		await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (kategoriId !== undefined) updateData.kategoriId = kategoriId;
	if (title !== undefined) updateData.title = title;
	if (subtitle !== undefined) updateData.subtitle = subtitle;
	if (image !== undefined) updateData.image = image;
	if (alamat !== undefined) updateData.alamat = alamat;
	if (tahun !== undefined) updateData.tahun = tahun;

	if (Object.keys(updateData).length > 0) {
		await db
			.update(schema.portfolio)
			.set(updateData)
			.where(eq(schema.portfolio.id, id));
	}

	if (images !== undefined && Array.isArray(images)) {
		await db
			.delete(schema.portfolioImage)
			.where(eq(schema.portfolioImage.portfolioId, id));

		for (const img of images) {
			await db.insert(schema.portfolioImage).values({
				id: randomUUID(),
				portfolioId: id,
				image: img,
			});
		}
	}

	const updated = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));

	if (!updated[0]) return c.json({ error: "not found" }, 404);

	const updatedImages = await db
		.select()
		.from(schema.portfolioImage)
		.where(eq(schema.portfolioImage.portfolioId, id));

	return c.json({ data: { ...updated[0], images: updatedImages } });
});

app.delete("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const deleted = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db.delete(schema.portfolio).where(eq(schema.portfolio.id, id));
	return c.json({ data: deleted[0] });
});

export default app;