import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getTestimoni = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await fetchApi("/api/testimoni");
		return res.json();
	},
);
