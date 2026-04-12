/**
 * Fetches from the API server using the external URL.
 */
export async function fetchApi(
	path: string,
	init?: RequestInit,
): Promise<Response> {
	const { env } = await import("@adinko/env/web");
	return fetch(`${env.VITE_SERVER_URL}${path}`, init);
}
