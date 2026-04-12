import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPerusahaanImage = createServerFn({ method: "GET" })
	.inputValidator((data: { nama: string }) => data)
	.handler(async ({ data }) => {
		const res = await fetchApi(
			`/api/perusahaan-image?nama=${encodeURIComponent(data.nama)}`,
		);
		return res.json();
	});
