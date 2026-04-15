import { Hono } from "hono";
import { randomUUID } from "crypto";

const CACHE_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

const app = new Hono();

interface CachedData {
	reviews: Array<{
		id: string;
		nama: string;
		testimoni: string;
		rating: number;
		kategoriId: string;
		kategoriNama: string;
		image: string | null;
		timeSpan: string | null;
		createdAt: Date;
	}>;
	nextPageToken: string | null;
	cachedAt: number;
}

interface SerpApiResponse {
	reviews?: Array<{
		position?: number;
		link?: string;
		rating?: number;
		date?: string;
		iso_date?: string;
		source?: string;
		review_id?: string;
		user?: {
			name?: string;
			link?: string;
			thumbnail?: string;
			local_guide?: boolean;
			reviews?: number;
			photos?: number;
		};
		snippet?: string;
		extracted_snippet?: {
			original?: string;
			translated?: string;
		};
		likes?: number;
		images?: Array<{ src: string }>;
		response?: {
			text?: string;
			date?: string;
		};
	}>;
	serpapi_pagination?: {
		next?: string;
		next_page_token?: string;
	};
	search_metadata?: {
		status?: string;
	};
}

const reviewCache: {
	data: CachedData | null;
	promise: Promise<CachedData> | null;
} = {
	data: null,
	promise: null,
};

async function getGoogleReviewsFromSerpApi(
	placeId: string,
	serpApiKey: string,
	pageToken?: string,
): Promise<{
	reviews: SerpApiResponse["reviews"];
	nextPageToken: string | null;
}> {
	const params = new URLSearchParams({
		engine: "google_maps_reviews",
		place_id: placeId,
		api_key: serpApiKey,
		hl: "en",
		gl: "id",
	});

	if (pageToken) {
		params.set("next_page_token", pageToken);
	}

	const url = `https://serpapi.com/search?${params.toString()}`;
	console.log("SerpApi request URL:", url.replace(serpApiKey, "REDACTED"));

	const response = await fetch(url);

	if (!response.ok) {
		const errorText = await response.text();
		console.error("SerpApi error:", response.status, errorText);
		return { reviews: [], nextPageToken: null };
	}

	const data = (await response.json()) as SerpApiResponse;

	let nextPageToken: string | null = null;
	if (data.serpapi_pagination?.next_page_token) {
		nextPageToken = data.serpapi_pagination.next_page_token;
	}

	return {
		reviews: data.reviews || [],
		nextPageToken,
	};
}

async function getGoogleReviews(pageToken?: string): Promise<CachedData> {
	const serpApiKey = process.env.SERPAPI_API_KEY;
	const placeId = process.env.GOOGLE_PLACE_ID;

	if (!serpApiKey || !placeId) {
		console.error(
			"Missing SERPAPI_API_KEY or GOOGLE_PLACE_ID in environment variables",
		);
		return (
			reviewCache.data || {
				reviews: [],
				nextPageToken: null,
				cachedAt: Date.now(),
			}
		);
	}

	if (
		!pageToken &&
		reviewCache.data &&
		Date.now() - reviewCache.data.cachedAt < CACHE_DURATION_MS
	) {
		console.log("Returning cached reviews");
		return reviewCache.data;
	}

	if (reviewCache.promise) {
		console.log("Waiting for existing promise");
		return reviewCache.promise;
	}

	reviewCache.promise = (async () => {
		console.log(
			"Fetching Google reviews via SerpApi for place:",
			placeId,
			pageToken ? "(page token provided)" : "",
		);

		try {
			const { reviews: apiReviews, nextPageToken } =
				await getGoogleReviewsFromSerpApi(placeId, serpApiKey, pageToken);

			const reviewsList = apiReviews || [];
			console.log("SerpApi returned reviews:", reviewsList.length);

			const googleKategoriId = "google";

			const transformedReviews = reviewsList.map((review) => ({
				id: `google-${randomUUID()}`,
				nama: review.user?.name || "Anonymous",
				testimoni: review.snippet || "Great service!",
				rating: review.rating || 5,
				kategoriId: googleKategoriId,
				kategoriNama: "Google",
				image: review.user?.thumbnail || null,
				timeSpan: review.date || null,
				createdAt: new Date(),
			}));

			let allReviews = transformedReviews;
			if (pageToken && reviewCache.data) {
				allReviews = [...reviewCache.data.reviews, ...transformedReviews];
			}

			const result: CachedData = {
				reviews: allReviews,
				nextPageToken,
				cachedAt: Date.now(),
			};

			reviewCache.data = result;
			reviewCache.promise = null;

			console.log(
				"Cached",
				allReviews.length,
				"reviews, hasMore:",
				!!nextPageToken,
			);
			return result;
		} catch (error) {
			console.error("Error fetching Google reviews:", error);
			reviewCache.promise = null;
			return (
				reviewCache.data || {
					reviews: [],
					nextPageToken: null,
					cachedAt: Date.now(),
				}
			);
		}
	})();

	return reviewCache.promise;
}

app.get("/", async (c) => {
	const pageToken = c.req.query("page_token");
	console.log(
		"Received request to /api/google-reviews",
		pageToken ? "(with page token)" : "",
	);
	const cachedData = await getGoogleReviews(pageToken);
	console.log(
		"Returning",
		cachedData.reviews.length,
		"reviews, hasMore:",
		!!cachedData.nextPageToken,
	);
	return c.json({
		data: cachedData.reviews,
		nextPageToken: cachedData.nextPageToken,
	});
});

export default app;
