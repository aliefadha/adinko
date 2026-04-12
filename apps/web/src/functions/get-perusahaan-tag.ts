import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPerusahaanTag = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await fetchApi("/api/perusahaan-tag");
		return res.json();
	},
);
