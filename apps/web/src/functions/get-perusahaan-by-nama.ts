import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPerusahaanByNama = createServerFn({ method: "GET" })
	.inputValidator((data: { nama: string }) => data)
	.handler(async ({ data }) => {
		const res = await fetchApi(`/api/perusahaan/${data.nama}`);
		return res.json();
	});
