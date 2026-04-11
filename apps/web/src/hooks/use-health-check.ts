import { useQuery } from "@tanstack/react-query";

export function useHealthCheck() {
	return useQuery({
		queryKey: ["health-check"],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/check-health`,
			);
			if (!response.ok) {
				throw new Error("Server unhealthy");
			}
			return response.json() as Promise<{ status: "ok" }>;
		},
		retry: 1,
		refetchInterval: 30000,
	});
}
