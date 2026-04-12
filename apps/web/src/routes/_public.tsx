import { Outlet, createFileRoute } from "@tanstack/react-router";

import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";

export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<div style={{ fontFamily: "'Montserrat', sans-serif" }}>
			<LandingHeader />
			<Outlet />
			<LandingFooter />
		</div>
	);
}
