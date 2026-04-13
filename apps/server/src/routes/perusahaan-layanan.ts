import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/perusahaan";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const { perusahaanId, nama } = c.req.query();

	if (nama) {
		const perusahaan = await db
			.select()
			.from(schema.perusahaan)
			.where(eq(schema.perusahaan.nama, nama));
		if (!perusahaan[0]) return c.json({ data: [] });

		const result = await db
			.select()
			.from(schema.perusahaanLayanan)
			.where(eq(schema.perusahaanLayanan.perusahaanId, perusahaan[0].id));
		return c.json({ data: result });
	}

	if (perusahaanId) {
		const result = await db
			.select()
			.from(schema.perusahaanLayanan)
			.where(eq(schema.perusahaanLayanan.perusahaanId, perusahaanId));
		return c.json({ data: result });
	}

	const result = await db.select().from(schema.perusahaanLayanan);
	return c.json({ data: result });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { perusahaanId, image, namaLayanan } = await c.req.json();

	if (!perusahaanId) return c.json({ error: "perusahaanId is required" }, 400);
	if (!namaLayanan) return c.json({ error: "namaLayanan is required" }, 400);

	const id = randomUUID();
	const now = new Date();
	await db.insert(schema.perusahaanLayanan).values({
		id,
		perusahaanId,
		image,
		namaLayanan,
		createdAt: now,
	});

	const created = await db
		.select()
		.from(schema.perusahaanLayanan)
		.where(eq(schema.perusahaanLayanan.id, id));
	return c.json({ data: created[0] }, 201);
});

app.put("/:id", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { id } = c.req.param();
	const { image, namaLayanan } = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (image !== undefined) updateData.image = image;
	if (namaLayanan !== undefined) updateData.namaLayanan = namaLayanan;

	await db
		.update(schema.perusahaanLayanan)
		.set(updateData)
		.where(eq(schema.perusahaanLayanan.id, id));

	const updated = await db
		.select()
		.from(schema.perusahaanLayanan)
		.where(eq(schema.perusahaanLayanan.id, id));

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
		.from(schema.perusahaanLayanan)
		.where(eq(schema.perusahaanLayanan.id, id));

	if (!deleted[0]) return c.json({ error: "not found" }, 404);

	await db
		.delete(schema.perusahaanLayanan)
		.where(eq(schema.perusahaanLayanan.id, id));
	return c.json({ data: deleted[0] });
});

export default app;
