import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/knbnw3/_index")({
	beforeLoad: () => {
		throw redirect({ to: "/knbnw3/kategori" });
	},
});
