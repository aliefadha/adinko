import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const perusahaan = sqliteTable("perusahaan", {
	id: text("id").primaryKey(),
	nama: text("nama").notNull(),
	logo: text("logo"),
	title: text("title"),
	subtitle: text("subtitle"),
	visi: text("visi"),
	misi: text("misi"),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const perusahaanImage = sqliteTable("perusahaan_image", {
	id: text("id").primaryKey(),
	perusahaanId: text("perusahaan_id")
		.notNull()
		.references(() => perusahaan.id, { onDelete: "cascade" }),
	image: text("image").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const perusahaanTag = sqliteTable("perusahaan_tag", {
	id: text("id").primaryKey(),
	perusahaanId: text("perusahaan_id")
		.notNull()
		.references(() => perusahaan.id, { onDelete: "cascade" }),
	tag: text("tag").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const perusahaanAlasan = sqliteTable("perusahaan_alasan", {
	id: text("id").primaryKey(),
	perusahaanId: text("perusahaan_id")
		.notNull()
		.references(() => perusahaan.id, { onDelete: "cascade" }),
	alasan: text("alasan").notNull(),
	sortOrder: integer("sort_order").default(0),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const perusahaanLayanan = sqliteTable("perusahaan_layanan", {
	id: text("id").primaryKey(),
	perusahaanId: text("perusahaan_id")
		.notNull()
		.references(() => perusahaan.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	subtitle: text("subtitle"),
	image: text("image"),
	namaLayanan: text("nama_layanan").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const perusahaanRelations = relations(perusahaan, ({ many }) => ({
	images: many(perusahaanImage),
	tags: many(perusahaanTag),
	alasan: many(perusahaanAlasan),
	layanan: many(perusahaanLayanan),
}));

export const perusahaanImageRelations = relations(
	perusahaanImage,
	({ one }) => ({
		perusahaan: one(perusahaan, {
			fields: [perusahaanImage.perusahaanId],
			references: [perusahaan.id],
		}),
	}),
);

export const perusahaanTagRelations = relations(perusahaanTag, ({ one }) => ({
	perusahaan: one(perusahaan, {
		fields: [perusahaanTag.perusahaanId],
		references: [perusahaan.id],
	}),
}));

export const perusahaanAlasanRelations = relations(
	perusahaanAlasan,
	({ one }) => ({
		perusahaan: one(perusahaan, {
			fields: [perusahaanAlasan.perusahaanId],
			references: [perusahaan.id],
		}),
	}),
);

export const perusahaanLayananRelations = relations(
	perusahaanLayanan,
	({ one }) => ({
		perusahaan: one(perusahaan, {
			fields: [perusahaanLayanan.perusahaanId],
			references: [perusahaan.id],
		}),
	}),
);
