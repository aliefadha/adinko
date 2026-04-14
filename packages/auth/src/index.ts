import { createDb } from "@adinko/db";
import * as schema from "@adinko/db/schema/auth";
import { env } from "@adinko/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const getAllowedOrigins = (): string[] => {
	const defaultOrigins = ["http://localhost:3000", "http://localhost:5173"];
	const envOrigins = env.ALLOWED_ORIGINS;
	if (!envOrigins) {
		return defaultOrigins;
	}
	return envOrigins
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);
};

export function createAuth() {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "sqlite",

			schema: schema,
		}),
		trustedOrigins: getAllowedOrigins(),
		emailAndPassword: {
			enabled: true,
		},
		// uncomment cookieCache setting when ready to deploy to Cloudflare using *.workers.dev domains
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 60,
			},
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		advanced: {
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
			// uncomment crossSubDomainCookies setting when ready to deploy and replace <your-workers-subdomain> with your actual workers subdomain
			// https://developers.cloudflare.com/workers/wrangler/configuration/#workersdev
			crossSubDomainCookies: {
				enabled: true,
				domain: "alifadha1.workers.dev",
			},
		},
	});
}
