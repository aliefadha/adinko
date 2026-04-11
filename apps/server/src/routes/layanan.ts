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
	return c.json({ data: result });
});

app.get("/:id", async (c) => {
	const db = createDb();
	const { id } = c.req.param();
	const result = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));
	if (!result[0]) return c.json({ data: null }, 404);
	return c.json({ data: result[0] });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { title, image } = await c.req.json();

	if (!title) return c.json({ error: "title is required" }, 400);

	const id = randomUUID();
	await db.insert(schema.layanan).values({
		id,
		title,
		image,
	});

	const created = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));
	return c.json({ data: created[0] }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { title, image } = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (title !== undefined) updateData.title = title;
	if (image !== undefined) updateData.image = image;

	await db
		.update(schema.layanan)
		.set(updateData)
		.where(eq(schema.layanan.id, id));

	const updated = await db
		.select()
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));

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
		.from(schema.layanan)
		.where(eq(schema.layanan.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db.delete(schema.layanan).where(eq(schema.layanan.id, id));
	return c.json({ data: deleted[0] });
});

export default app;
