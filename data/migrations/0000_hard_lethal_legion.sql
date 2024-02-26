CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`email` text(256) NOT NULL,
	`bio` text(1024),
	`picture` text(512)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`name`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);