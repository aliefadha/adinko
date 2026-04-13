import { Hono } from "hono";
import type { R2Bucket } from "@cloudflare/workers-types";

type CloudflareEnv = {
	R2_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: CloudflareEnv }>();

app.get("/:key{.+}", async (c) => {
	const key = c.req.param("key");

	if (!key) {
		return c.json({ error: "key is required" }, 400);
	}

	const object = await c.env.R2_BUCKET.get(key);

	if (!object) {
		return c.json({ error: "file not found" }, 404);
	}

	const headers = new Headers();
	object.writeHttpMetadata(headers);

	headers.set(
		"Content-Type",
		object.httpMetadata?.contentType || "application/octet-stream"
	);
	headers.set("Cache-Control", "public, max-age=31536000, immutable");
	headers.set("Access-Control-Allow-Origin", "*");
	headers.set("Cross-Origin-Resource-Policy", "cross-origin");

	if (object.httpEtag) {
		headers.set("ETag", object.httpEtag);
	}

	return new Response(object.body, {
		status: 200,
		headers,
	});
});

export default app;