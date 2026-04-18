import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/umum";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const result = await db.select().from(schema.layanan);
	const images = await db.select().from(schema.layananImage);

	const resultWithImages = result.map((layanan) => ({
		...layanan,
		images: images.filter((img) => img.layananId === layanan.id),
	}));

	return c.json({ data: resultWithImages });
});

app.get("/:id", async (c) => {
	const db = createDb();
	const { id } = c.req.param();
	const result = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));
	if (!result[0]) return c.json({ data: null }, 404);

	const images = await db
		.select()
		.from(schema.layananImage)
		.where(eq(schema.layananImage.layananId, id));

	return c.json({ data: { ...result[0], images } });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { title, images } = await c.req.json();

	if (!title) return c.json({ error: "title is required" }, 400);

	const id = randomUUID();
	await db.insert(schema.layanan).values({
		id,
		title,
	});

	if (images && Array.isArray(images)) {
		for (const img of images) {
			await db.insert(schema.layananImage).values({
				id: randomUUID(),
				layananId: id,
				image: img,
			});
		}
	}

	const created = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));
	const createdImages = await db
		.select()
		.from(schema.layananImage)
		.where(eq(schema.layananImage.layananId, id));

	return c.json({ data: { ...created[0], images: createdImages } }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { title, images } = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (title !== undefined) updateData.title = title;

	if (Object.keys(updateData).length > 0) {
		await db
			.update(schema.layanan)
			.set(updateData)
			.where(eq(schema.layanan.id, id));
	}

	if (images !== undefined && Array.isArray(images)) {
		await db
			.delete(schema.layananImage)
			.where(eq(schema.layananImage.layananId, id));

		for (const img of images) {
			await db.insert(schema.layananImage).values({
				id: randomUUID(),
				layananId: id,
				image: img,
			});
		}
	}

	const updated = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));

	if (!updated[0]) return c.json({ error: "not found" }, 404);

	const updatedImages = await db
		.select()
		.from(schema.layananImage)
		.where(eq(schema.layananImage.layananId, id));

	return c.json({ data: { ...updated[0], images: updatedImages } });
});

app.delete("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const deleted = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db.delete(schema.layanan).where(eq(schema.layanan.id, id));
	return c.json({ data: deleted[0] });
});

export default app;