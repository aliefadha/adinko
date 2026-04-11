import { createAuth } from "@adinko/auth";
import { env } from "@adinko/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import kategoriRoute from "./routes/kategori";
import portfolioRoute from "./routes/portfolio";
import testimoniRoute from "./routes/testimoni";
import layananRoute from "./routes/layanan";
import kontakRoute from "./routes/kontak";
import uploadRoute from "./routes/upload";

const app = new Hono();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN,
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => createAuth().handler(c.req.raw));

app.route("/api/kategori", kategoriRoute);
app.route("/api/portfolio", portfolioRoute);
app.route("/api/testimoni", testimoniRoute);
app.route("/api/layanan", layananRoute);
app.route("/api/kontak", kontakRoute);
app.route("/api/upload", uploadRoute);

app.get("/", (c) => {
	return c.text("OK");
});

app.get("/check-health", (c) => {
	return c.json({ status: "ok" });
});

export default app;
