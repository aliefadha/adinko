import { Hono } from "hono";
import { createDb } from "@adinko/db";
import { eq } from "drizzle-orm";
import * as schema from "@adinko/db/schema/umum";
import { randomUUID } from "crypto";
import { requireAuth } from "./_middleware";

const app = new Hono();

app.get("/", async (c) => {
	const db = createDb();
	const result = await db.select().from(schema.kontak);
	return c.json({ data: result });
});

app.post("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { alamat, wa, instagram, email } = await c.req.json();

	await db.insert(schema.kontak).values({
		id: randomUUID(),
		alamat,
		wa,
		instagram,
		email,
	});

	return c.json({ success: true }, 201);
});

app.put("/", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const db = createDb();
	const { alamat, wa, instagram, email } = await c.req.json();

	const updateData: Record<string, unknown> = {};
	if (alamat !== undefined) updateData.alamat = alamat;
	if (wa !== undefined) updateData.wa = wa;
	if (instagram !== undefined) updateData.instagram = instagram;
	if (email !== undefined) updateData.email = email;

	const existing = await db.select().from(schema.kontak);

	if (existing[0]) {
		await db
			.update(schema.kontak)
			.set(updateData)
			.where(eq(schema.kontak.id, existing[0].id));
	} else {
		await db.insert(schema.kontak).values({
			id: randomUUID(),
			alamat: updateData.alamat as string | undefined,
			wa: updateData.wa as string | undefined,
			instagram: updateData.instagram as string | undefined,
			email: updateData.email as string | undefined,
		});
	}

	const updated = await db.select().from(schema.kontak);
	return c.json({ data: updated[0] });
});

export default app;
