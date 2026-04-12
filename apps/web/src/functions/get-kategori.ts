import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getKategori = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await fetchApi("/api/kategori");
		return res.json();
	},
);
