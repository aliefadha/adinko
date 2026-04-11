import { Hono } from "hono";
import { requireAuth } from "./_middleware";

import type { R2Bucket } from "@cloudflare/workers-types";

type CloudflareEnv = {
	R2_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: CloudflareEnv }>();

app.post("/file", async (c) => {
	const authSession = await requireAuth(c);
	if (authSession instanceof Response) return authSession;

	const formData = await c.req.formData();
	const file = formData.get("file") as File | null;
	const entity = formData.get("entity") as string | null;

	if (!file || !entity) {
		return c.json({ error: "file and entity are required" }, 400);
	}

	if (!["portfolio", "layanan"].includes(entity)) {
		return c.json({ error: "entity must be 'portfolio' or 'layanan'" }, 400);
	}

	const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
	if (!allowedTypes.includes(file.type)) {
		return c.json({ error: "invalid file type" }, 400);
	}

	const r2 = c.env.R2_BUCKET;
	const key = `${entity}/${Date.now()}-${file.name}`;

	const arrayBuffer = await file.arrayBuffer();

	await r2.put(key, arrayBuffer, {
		httpMetadata: {
			contentType: file.type,
		},
	});

	const publicUrl = `https://adinko-images.a739e5916949d089fce41ef3f15ca53d.r2.dev/${key}`;

	return c.json({ data: { key, publicUrl } });
});

export default app;
