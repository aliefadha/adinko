import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getLayanan = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await fetchApi("/api/layanan");
		return res.json();
	},
);
