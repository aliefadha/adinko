import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { Worker } from "alchemy/cloudflare";
import { D1Database } from "alchemy/cloudflare";
import { R2Bucket } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });
config({ path: "../../apps/server/.env" });

const app = await alchemy("adinko");

const db = await D1Database("database", {
	migrationsDir: "../../packages/db/src/migrations",
	dev: { remote: true },
});

const r2Bucket = await R2Bucket("adinko-images", {
	name: "adinko-images",
	dev: { remote: true },
});

export const web = await TanStackStart("web", {
	cwd: "../../apps/web",
	bindings: {
		VITE_SERVER_URL: alchemy.env.VITE_SERVER_URL!,
		DB: db,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
	},
});

export const server = await Worker("server", {
	cwd: "../../apps/server",
	entrypoint: "src/index.ts",
	compatibility: "node",
	bindings: {
		DB: db,
		R2_BUCKET: r2Bucket,
		R2_PUBLIC_URL: alchemy.env.R2_PUBLIC_URL!,
		R2_BUCKET_NAME: alchemy.env.R2_BUCKET_NAME!,
		CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
	},
	dev: {
		port: 3000,
	},
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

await app.finalize();
