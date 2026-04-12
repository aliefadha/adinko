import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPerusahaan = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await fetchApi("/api/perusahaan");
		return res.json();
	},
);
