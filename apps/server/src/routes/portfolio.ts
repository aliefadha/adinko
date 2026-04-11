import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/umum";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const result = await db.select().from(schema.portfolio);
	return c.json({ data: result });
});

app.get("/:id", async (c) => {
	const db = createDb();
	const { id } = c.req.param();
	const result = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));
	if (!result[0]) return c.json({ data: null }, 404);
	return c.json({ data: result[0] });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { kategoriId, title, subtitle, image, alamat, tahun } =
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

	const created = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));
	return c.json({ data: created[0] }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { kategoriId, title, subtitle, image, alamat, tahun } =
		await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (kategoriId !== undefined) updateData.kategoriId = kategoriId;
	if (title !== undefined) updateData.title = title;
	if (subtitle !== undefined) updateData.subtitle = subtitle;
	if (image !== undefined) updateData.image = image;
	if (alamat !== undefined) updateData.alamat = alamat;
	if (tahun !== undefined) updateData.tahun = tahun;

	await db
		.update(schema.portfolio)
		.set(updateData)
		.where(eq(schema.portfolio.id, id));

	const updated = await db
		.select()
		.from(schema.portfolio)
		.where(eq(schema.portfolio.id, id));

	if (!updated[0]) return c.json({ error: "not found" }, 404);
	return c.json({ data: updated[0] });
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
