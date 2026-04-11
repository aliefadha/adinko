import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/perusahaan";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const { perusahaanId } = c.req.query();

	if (perusahaanId) {
		const result = await db
			.select()
			.from(schema.perusahaanImage)
			.where(eq(schema.perusahaanImage.perusahaanId, perusahaanId));
		return c.json({ data: result });
	}

	const result = await db.select().from(schema.perusahaanImage);
	return c.json({ data: result });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { perusahaanId, image } = await c.req.json();

	if (!perusahaanId) return c.json({ error: "perusahaanId is required" }, 400);
	if (!image) return c.json({ error: "image is required" }, 400);

	const id = randomUUID();
	const now = new Date();
	await db.insert(schema.perusahaanImage).values({
		id,
		perusahaanId,
		image,
		createdAt: now,
	});

	const created = await db
		.select()
		.from(schema.perusahaanImage)
		.where(eq(schema.perusahaanImage.id, id));
	return c.json({ data: created[0] }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { image } = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (image !== undefined) updateData.image = image;

	await db
		.update(schema.perusahaanImage)
		.set(updateData)
		.where(eq(schema.perusahaanImage.id, id));

	const updated = await db
		.select()
		.from(schema.perusahaanImage)
		.where(eq(schema.perusahaanImage.id, id));

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
		.from(schema.perusahaanImage)
		.where(eq(schema.perusahaanImage.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db
		.delete(schema.perusahaanImage)
		.where(eq(schema.perusahaanImage.id, id));
	return c.json({ data: deleted[0] });
});

export default app;
