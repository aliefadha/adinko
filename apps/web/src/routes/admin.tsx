import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { FolderIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";

import { Button } from "@adinko/ui/components/button";
import { getUser } from "@/functions/get-user";
import { authClient } from "@/lib/auth-client";
import { Card } from "@adinko/ui/components/card";

export const Route = createFileRoute("/admin")({
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
		return { session: context.session };
	},
	component: AdminLayout,
});

function AdminLayout() {
	const { session } = Route.useRouteContext();

	return (
		<div className="flex h-[calc(100vh-56px)]">
			<aside className="w-56 border-r bg-card">
				<div className="flex h-full flex-col">
					<nav className="flex-1 overflow-y-auto p-4">
						<div className="flex flex-col gap-1">
							<div className="mb-4">
								<p className="px-2 text-xs font-medium text-muted-foreground">
									Overview
								</p>
								<Link
									to="/dashboard"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									<LayoutDashboardIcon className="size-4" />
									Dashboard
								</Link>
							</div>

							<div className="mb-4">
								<p className="px-2 text-xs font-medium text-muted-foreground">
									Umum
								</p>
								<Link
									to="/admin/kategori"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									<FolderIcon className="size-4" />
									Kategori
								</Link>
								<Link
									to="/admin/portfolio"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									<FolderIcon className="size-4" />
									Portfolio
								</Link>
								<Link
									to="/admin/testimoni"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									<FolderIcon className="size-4" />
									Testimoni
								</Link>
								<Link
									to="/admin/layanan"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									<FolderIcon className="size-4" />
									Layanan
								</Link>
								<Link
									to="/admin/kontak"
									className="flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted"
								>
									<FolderIcon className="size-4" />
									Kontak
								</Link>
							</div>
						</div>
					</nav>

					<div className="border-t p-4">
						<Card className="p-3">
							<div className="flex items-center gap-2">
								<div className="flex-1 truncate">
									<p className="truncate text-xs font-medium">
										{session?.user.name}
									</p>
									<p className="truncate text-xs text-muted-foreground">
										{session?.user.email}
									</p>
								</div>
								<Button
									size="icon"
									variant="ghost"
									onClick={() => authClient.signOut()}
								>
									<SettingsIcon className="size-4" data-icon="inline-start" />
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
