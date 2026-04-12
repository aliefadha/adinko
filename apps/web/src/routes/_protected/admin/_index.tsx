import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/_index")({
	component: AdminIndex,
});

function AdminIndex() {
	const routeContext = Route.useRouteContext();

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Admin Dashboard</h1>
			<p className="text-muted-foreground">
				Welcome back, {routeContext.user?.name}
			</p>
		</div>
	);
}
