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
			id: schema.testimoni.id,
			kategoriId: schema.testimoni.kategoriId,
			kategoriNama: schema.kategori.nama,
			nama: schema.testimoni.nama,
			testimoni: schema.testimoni.testimoni,
			image: schema.testimoni.image,
			createdAt: schema.testimoni.createdAt,
		})
		.from(schema.testimoni)
		.leftJoin(
			schema.kategori,
			eq(schema.testimoni.kategoriId, schema.kategori.id),
		);
	return c.json({ data: result });
});

app.get("/:id", async (c) => {
	const db = createDb();
	const { id } = c.req.param();
	const result = await db
		.select()
		.from(schema.testimoni)
		.where(eq(schema.testimoni.id, id));
	if (!result[0]) return c.json({ data: null }, 404);
	return c.json({ data: result[0] });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { kategoriId, image, nama, testimoni } = await c.req.json();

	if (!kategoriId) return c.json({ error: "kategoriId is required" }, 400);
	if (!nama) return c.json({ error: "nama is required" }, 400);
	if (!testimoni) return c.json({ error: "testimoni is required" }, 400);

	const id = randomUUID();
	const now = new Date();
	await db.insert(schema.testimoni).values({
		id,
		kategoriId,
		image,
		nama,
		testimoni,
		createdAt: now,
	});

	const created = await db
		.select()
		.from(schema.testimoni)
		.where(eq(schema.testimoni.id, id));
	return c.json({ data: created[0] }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { kategoriId, image, nama, testimoni } = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (kategoriId !== undefined) updateData.kategoriId = kategoriId;
	if (image !== undefined) updateData.image = image;
	if (nama !== undefined) updateData.nama = nama;
	if (testimoni !== undefined) updateData.testimoni = testimoni;

	await db
		.update(schema.testimoni)
		.set(updateData)
		.where(eq(schema.testimoni.id, id));

	const updated = await db
		.select()
		.from(schema.testimoni)
		.where(eq(schema.testimoni.id, id));

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
		.from(schema.testimoni)
		.where(eq(schema.testimoni.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db.delete(schema.testimoni).where(eq(schema.testimoni.id, id));
	return c.json({ data: deleted[0] });
});

export default app;
