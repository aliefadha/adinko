import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const kategori = sqliteTable("kategori", {
	id: text("id").primaryKey(),
	nama: text("nama").notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const portfolio = sqliteTable("portfolio", {
	id: text("id").primaryKey(),
	kategoriId: text("kategori_id")
		.notNull()
		.references(() => kategori.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	subtitle: text("subtitle"),
	image: text("image"),
	alamat: text("alamat"),
	tahun: text("tahun"),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const portfolioImage = sqliteTable("portfolio_image", {
	id: text("id").primaryKey(),
	portfolioId: text("portfolio_id")
		.notNull()
		.references(() => portfolio.id, { onDelete: "cascade" }),
	image: text("image").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const testimoni = sqliteTable("testimoni", {
	id: text("id").primaryKey(),
	kategoriId: text("kategori_id")
		.notNull()
		.references(() => kategori.id, { onDelete: "cascade" }),
	image: text("image"),
	nama: text("nama").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	testimoni: text("testimoni").notNull(),
});

export const layanan = sqliteTable("layanan", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
});

export const layananImage = sqliteTable("layanan_image", {
	id: text("id").primaryKey(),
	layananId: text("layanan_id")
		.notNull()
		.references(() => layanan.id, { onDelete: "cascade" }),
	image: text("image").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
});

export const kontak = sqliteTable("kontak", {
	id: text("id").primaryKey(),
	alamat: text("alamat"),
	wa: text("wa"),
	instagram: text("instagram"),
	email: text("email"),
});

export const kategoriRelations = relations(kategori, ({ many }) => ({
	portfolios: many(portfolio),
	testimonis: many(testimoni),
}));

export const portfolioRelations = relations(portfolio, ({ one, many }) => ({
	kategori: one(kategori, {
		fields: [portfolio.kategoriId],
		references: [kategori.id],
	}),
	images: many(portfolioImage),
}));

export const portfolioImageRelations = relations(
	portfolioImage,
	({ one }) => ({
		portfolio: one(portfolio, {
			fields: [portfolioImage.portfolioId],
			references: [portfolio.id],
		}),
	}),
);

export const testimoniRelations = relations(testimoni, ({ one }) => ({
	kategori: one(kategori, {
		fields: [testimoni.kategoriId],
		references: [kategori.id],
	}),
}));

export const layananRelations = relations(layanan, ({ many }) => ({
	images: many(layananImage),
}));

export const layananImageRelations = relations(layananImage, ({ one }) => ({
	layanan: one(layanan, {
		fields: [layananImage.layananId],
		references: [layanan.id],
	}),
}));
