CREATE TABLE IF NOT EXISTS `layanan_image` (
	`id` text PRIMARY KEY NOT NULL,
	`layanan_id` text NOT NULL,
	`image` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`layanan_id`) REFERENCES `layanan`(`id`) ON UPDATE no action ON DELETE cascade
--> statement-breakpoint
)