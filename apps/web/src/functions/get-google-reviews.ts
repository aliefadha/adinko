import { createServerFn } from "@tanstack/react-start";
import { fetchApi } from "./fetch-api";

export const getGoogleReviews = createServerFn({ method: "GET" })
	.inputValidator((data: { pageToken?: string } | undefined) => data)
	.handler(async ({ data }) => {
		try {
			const url = data?.pageToken
				? `/api/google-reviews?page_token=${encodeURIComponent(data.pageToken)}`
				: "/api/google-reviews";

			const res = await fetchApi(url);
			if (!res.ok) {
				console.error(
					"Google reviews API error:",
					res.status,
					await res.text(),
				);
				return { data: [], nextPageToken: null };
			}
			try {
				const json = await res.json();
				return {
					data: json.data || [],
					nextPageToken: json.nextPageToken || null,
				};
			} catch {
				console.error("Failed to parse Google reviews response");
				return { data: [], nextPageToken: null };
			}
		} catch (error) {
			console.error("Failed to fetch Google reviews:", error);
			return { data: [], nextPageToken: null };
		}
	});
