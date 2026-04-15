import { Outlet, createFileRoute } from "@tanstack/react-router";

import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { getKontak } from "@/functions/get-kontak";

export const Route = createFileRoute("/_public")({
	beforeLoad: async () => {
		const kontak = await getKontak();
		return {
			kontakData: kontak?.data?.[0]?.wa
				? {
						wa: kontak.data[0].wa,
						alamat: kontak.data[0].alamat,
						instagram: kontak.data[0].instagram,
						email: kontak.data[0].email,
					}
				: null,
		};
	},
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
