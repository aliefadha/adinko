import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPerusahaanAlasan = createServerFn({ method: "GET" })
	.inputValidator((data: { nama: string }) => data)
	.handler(async ({ data }) => {
		const res = await fetchApi(
			`/api/perusahaan-alasan?nama=${encodeURIComponent(data.nama)}`,
		);
		return res.json();
	});
