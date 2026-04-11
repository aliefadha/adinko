CREATE TABLE `perusahaan` (
	`id` text PRIMARY KEY NOT NULL,
	`nama` text NOT NULL,
	`title` text,
	`subtitle` text,
	`visi` text,
	`misi` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `perusahaan_alasan` (
	`id` text PRIMARY KEY NOT NULL,
	`perusahaan_id` text NOT NULL,
	`icon` text NOT NULL,
	`alasan` text NOT NULL,
	`sort_order` integer DEFAULT 0,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `perusahaan_image` (
	`id` text PRIMARY KEY NOT NULL,
	`perusahaan_id` text NOT NULL,
	`image` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `perusahaan_layanan` (
	`id` text PRIMARY KEY NOT NULL,
	`perusahaan_id` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`image` text,
	`nama_layanan` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `perusahaan_tag` (
	`id` text PRIMARY KEY NOT NULL,
	`perusahaan_id` text NOT NULL,
	`tag` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan`(`id`) ON UPDATE no action ON DELETE cascade
);
