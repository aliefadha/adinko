import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/umum";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const result = await db.select().from(schema.kategori);
	return c.json({ data: result });
});

app.get("/:id", async (c) => {
	const db = createDb();
	const { id } = c.req.param();
	const result = await db
		.select()
		.from(schema.kategori)
		.where(eq(schema.kategori.id, id));
	if (!result[0]) return c.json({ data: null }, 404);
	return c.json({ data: result[0] });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { nama, image } = await c.req.json();
	if (!nama) return c.json({ error: "nama is required" }, 400);

	const id = randomUUID();
	const now = new Date();
	await db.insert(schema.kategori).values({ id, nama, image, createdAt: now });

	const created = await db
		.select()
		.from(schema.kategori)
		.where(eq(schema.kategori.id, id));
	return c.json({ data: created[0] }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { nama, image } = await c.req.json();
	if (!nama) return c.json({ error: "nama is required" }, 400);

	const updateData: Record<string, unknown> = { nama };
	if (image !== undefined) updateData.image = image;

	await db
		.update(schema.kategori)
		.set(updateData)
		.where(eq(schema.kategori.id, id));

	const updated = await db
		.select()
		.from(schema.kategori)
		.where(eq(schema.kategori.id, id));

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
		.from(schema.kategori)
		.where(eq(schema.kategori.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db.delete(schema.kategori).where(eq(schema.kategori.id, id));
	return c.json({ data: deleted[0] });
});

export default app;
