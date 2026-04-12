import { authClient } from "@/lib/auth-client";
import { Button } from "@adinko/ui/components/button";
import { Skeleton } from "@adinko/ui/components/skeleton";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/_index")({
	component: AdminIndex,
});

function AdminIndex() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <Skeleton className="h-9 w-24" />;
	}

	if (!session) {
		return (
			<Link to="/login">
				<Button variant="outline">Sign In</Button>
			</Link>
		);
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Admin Dashboard</h1>
			<p className="text-muted-foreground">
				Welcome back, {session.user.name}
			</p>
		</div>
	);
}
