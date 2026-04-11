import { createDb } from "@adinko/db";
import { perusahaan } from "./schema/perusahaan";
import { randomUUID } from "crypto";

async function seed() {
	const db = createDb();

	console.log("Seeding perusahaan table...");

	const existing = await db.select().from(perusahaan);

	if (existing.length > 0) {
		console.log("perusahaan table already has data, skipping seed");
		return;
	}

	const now = new Date();

	await db.insert(perusahaan).values([
		{
			id: randomUUID(),
			nama: "Adinko",
			createdAt: now,
		},
		{
			id: randomUUID(),
			nama: "Ghazisportshub",
			createdAt: now,
		},
	]);

	console.log("Seeded 2 rows in perusahaan table: Adinko, Ghazisportshub");
}

seed().catch(console.error);
