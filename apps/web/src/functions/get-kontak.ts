import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getKontak = createServerFn({ method: "GET" }).handler(async () => {
	const res = await fetchApi("/api/kontak");
	return res.json();
});
