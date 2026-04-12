import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: AuthComponent,
	beforeLoad: ({ context }) => {
		if (context.session) {
			throw redirect({ to: "/admin/kategori" });
		}
	},
});

function AuthComponent() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
