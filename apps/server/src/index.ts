import { createAuth } from "@adinko/auth";
import { env } from "@adinko/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import kategoriRoute from "./routes/kategori";
import portfolioRoute from "./routes/portfolio";
import testimoniRoute from "./routes/testimoni";
import googleReviewsRoute from "./routes/google-reviews";
import layananRoute from "./routes/layanan";
import kontakRoute from "./routes/kontak";
import uploadRoute from "./routes/upload";
import perusahaanRoute from "./routes/perusahaan";
import perusahaanImageRoute from "./routes/perusahaan-image";
import perusahaanTagRoute from "./routes/perusahaan-tag";
import perusahaanAlasanRoute from "./routes/perusahaan-alasan";
import perusahaanLayananRoute from "./routes/perusahaan-layanan";

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

const app = new Hono();

app.use(
	"/*",
	cors({
		origin: getAllowedOrigins(),
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		exposeHeaders: ["Content-Length"],
		credentials: true,
	}),
);
app.use(logger());

app.on(["POST", "GET"], "/api/auth/*", (c) => createAuth().handler(c.req.raw));

app.route("/api/kategori", kategoriRoute);
app.route("/api/portfolio", portfolioRoute);
app.route("/api/testimoni", testimoniRoute);
app.route("/api/google-reviews", googleReviewsRoute);
app.route("/api/layanan", layananRoute);
app.route("/api/kontak", kontakRoute);
app.route("/api/upload", uploadRoute);
app.route("/api/perusahaan", perusahaanRoute);
app.route("/api/perusahaan-image", perusahaanImageRoute);
app.route("/api/perusahaan-tag", perusahaanTagRoute);
app.route("/api/perusahaan-alasan", perusahaanAlasanRoute);
app.route("/api/perusahaan-layanan", perusahaanLayananRoute);

app.get("/", (c) => {
	return c.text("OK");
});

app.get("/check-health", (c) => {
	return c.json({ status: "ok" });
});

export default app;
