import { createAuth } from "@adinko/auth";
import type { Context } from "hono";

export async function requireAuth(c: Context) {
	const auth = createAuth();
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		return c.json({ error: "Unauthorized" }, 401);
	}
	return session;
}
