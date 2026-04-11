CREATE TABLE `kategori` (
	`id` text PRIMARY KEY NOT NULL,
	`nama` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `kontak` (
	`id` text PRIMARY KEY NOT NULL,
	`alamat` text,
	`wa` text,
	`instagram` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `layanan` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `portfolio` (
	`id` text PRIMARY KEY NOT NULL,
	`kategori_id` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`image` text,
	`alamat` text,
	`tahun` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `testimoni` (
	`id` text PRIMARY KEY NOT NULL,
	`kategori_id` text NOT NULL,
	`image` text,
	`nama` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`testimoni` text NOT NULL,
	FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON UPDATE no action ON DELETE cascade
);
