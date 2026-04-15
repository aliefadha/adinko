import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";
import { Worker } from "alchemy/cloudflare";
import { D1Database } from "alchemy/cloudflare";
import { R2Bucket } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env.production" });
config({ path: "../../apps/server/.env.production" });

const app = await alchemy("adinko");

const db = await D1Database("database", {
	migrationsDir: "../../packages/db/src/migrations",
	dev: { remote: true },
});

const r2Bucket = await R2Bucket("adinko-images", {
	name: "adinko-images",
	dev: { remote: true },
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
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
		SERVER_URL: alchemy.env.SERVER_URL!,
		ALLOWED_ORIGINS: alchemy.secret.env.ALLOWED_ORIGINS!,
		GOOGLE_PLACE_ID: alchemy.env.GOOGLE_PLACE_ID!,
		SERPAPI_API_KEY: alchemy.env.SERPAPI_API_KEY!
	},
	compatibilityFlags: [
		"nodejs_compat_populate_process_env",
		"nodejs_compat",
		"global_fetch_strictly_public",
	],
	url: true,
	dev: {
		port: 3000,
	},
});

export const web = await TanStackStart("web", {
	cwd: "../../apps/web",
	bindings: {
		VITE_SERVER_URL: server.url!,
		DB: db,
		BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
		BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
	},
	compatibilityFlags: [
		"nodejs_compat_populate_process_env",
		"nodejs_compat",
		"global_fetch_strictly_public",
	],
	url: true,
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

await app.finalize();
