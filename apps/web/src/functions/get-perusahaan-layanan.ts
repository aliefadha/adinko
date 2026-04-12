import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPerusahaanLayanan = createServerFn({ method: "GET" })
	.inputValidator((data: { nama: string }) => data)
	.handler(async ({ data }) => {
		const res = await fetchApi(
			`/api/perusahaan-layanan?nama=${encodeURIComponent(data.nama)}`,
		);
		return res.json();
	});
