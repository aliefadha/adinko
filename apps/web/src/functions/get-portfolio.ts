import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getPortfolio = createServerFn({ method: "GET" }).handler(
	async () => {
		const res = await fetchApi("/api/portfolio");
		return res.json();
	},
);
