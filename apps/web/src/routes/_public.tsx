import { Outlet, createFileRoute } from "@tanstack/react-router";

import LandingHeader from "@/components/landing-header";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<div>
			<LandingHeader />
			<Outlet />
		</div>
	);
}
