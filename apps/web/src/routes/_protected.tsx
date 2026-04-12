import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";

import { Button } from "@adinko/ui/components/button";
import { Card } from "@adinko/ui/components/card";
import { authClient } from "@/lib/auth-client";
import { getUser } from "@/functions/get-user";
import { Skeleton } from "@adinko/ui/components/skeleton";

export const Route = createFileRoute("/_protected")({
	beforeLoad: async () => {
		const session = await getUser();
		return { session };
	},
	loader: async ({ context }) => {
		if (!context.session) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: ProtectedLayout,
});

function ProtectedLayout() {
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
		<div className="flex h-[calc(100vh)]">
			<aside className="w-56 border-r bg-card">
				<div className="flex h-full flex-col">
					<nav className="flex-1 overflow-y-auto p-4">
						<div className="flex flex-col gap-1">
							<div className="mb-4 flex gap-4 bg-[#101A00] p-4 rounded-md">
								<img src="/logo.webp" className="w-16 h-16" />
								<img src="/logo-ghazi.webp" className="w-16 h-16" />
							</div>

							<div className="mb-4">
								<p className="px-2 text-xs font-medium text-muted-foreground">
									Umum
								</p>
								<Link
									to="/admin/kategori"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Kategori
								</Link>
								<Link
									to="/admin/portfolio"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Portfolio
								</Link>
								<Link
									to="/admin/testimoni"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Testimoni
								</Link>
								<Link
									to="/admin/layanan"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Layanan
								</Link>
								<Link
									to="/admin/kontak"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Kontak
								</Link>
							</div>

							<div className="mb-4">
								<p className="px-2 text-xs font-medium text-muted-foreground">
									Perusahaan
								</p>
								<Link
									to="/admin/perusahaan/$nama"
									params={{ nama: "Adinko" }}
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Adinko
								</Link>
								<Link
									to="/admin/perusahaan/$nama"
									params={{ nama: "Ghazisportshub" }}
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									Ghazisportshub
								</Link>
							</div>
						</div>
					</nav>

					<div className="border-t p-4">
						<Card className="p-3">
							<div className="flex items-center justify-between">
								<div className="flex-1 truncate">
									<p className="truncate text-xs font-medium">{session.user.name}</p>
									<p className="truncate text-xs text-muted-foreground">
										{session.user.email}
									</p>
								</div>
								<Button
									size="icon"
									variant="ghost"
									onClick={async () => {
										await authClient.signOut();
										window.location.href = "/login";
									}}
								>
									<LogOutIcon className="size-4" data-icon="inline-start" />
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</aside>

			<main className="flex-1 overflow-y-auto bg-muted/30 p-6">
				<Outlet />
			</main>
		</div>
	);
}
