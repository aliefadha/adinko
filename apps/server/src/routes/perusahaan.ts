import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/perusahaan";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const result = await db.select().from(schema.perusahaan);
	return c.json({ data: result });
});

app.get("/:nama", async (c) => {
	const db = createDb();
	const { nama } = c.req.param();
	const result = await db
		.select()
		.from(schema.perusahaan)
		.where(eq(schema.perusahaan.nama, nama));
	if (!result[0]) return c.json({ error: "not found" }, 404);
	return c.json({ data: result[0] });
});

app.put("/:nama", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { nama } = c.req.param();
	const {
		nama: newNama,
		logo,
		title,
		subtitle,
		visi,
		misi,
	} = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (newNama !== undefined) updateData.nama = newNama;
	if (logo !== undefined) updateData.logo = logo;
	if (title !== undefined) updateData.title = title;
	if (subtitle !== undefined) updateData.subtitle = subtitle;
	if (visi !== undefined) updateData.visi = visi;
	if (misi !== undefined) updateData.misi = misi;

	await db
		.update(schema.perusahaan)
		.set(updateData)
		.where(eq(schema.perusahaan.nama, nama));

	const updated = await db
		.select()
		.from(schema.perusahaan)
		.where(eq(schema.perusahaan.nama, nama));

	if (!updated[0]) return c.json({ error: "not found" }, 404);
	return c.json({ data: updated[0] });
});

app.post("/seed", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const existing = await db.select().from(schema.perusahaan);
	if (existing.length > 0) {
		return c.json({ message: "Already seeded", data: existing });
	}

	const now = new Date();
	await db.insert(schema.perusahaan).values([
		{ id: crypto.randomUUID(), nama: "Adinko", createdAt: now },
		{ id: crypto.randomUUID(), nama: "Ghazisportshub", createdAt: now },
	]);

	const result = await db.select().from(schema.perusahaan);
	return c.json({ message: "Seeded", data: result }, 201);
});

export default app;
