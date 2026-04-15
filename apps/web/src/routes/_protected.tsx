import {
	Button,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	Skeleton,
} from "@adinko/ui/components";
import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useRouterState,
} from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import * as React from "react";
import { getUser } from "@/functions/get-user";
import { authClient } from "@/lib/auth-client";

type NavItem = {
	title: string;
	href: string;
};

const primaryNav: Array<NavItem> = [
	{
		title: "Kategori",
		href: "/admin/kategori",
	},
	{
		title: "Portfolio",
		href: "/admin/portfolio",
	},
	{
		title: "Layanan",
		href: "/admin/layanan",
	},
	{
		title: "Kontak",
		href: "/admin/kontak",
	},
];

const perusahaanNav: Array<NavItem> = [
	{
		title: "Adinko",
		href: "/admin/perusahaan/Adinko",
	},
	{
		title: "Ghazisportshub",
		href: "/admin/perusahaan/Ghazisportshub",
	},
];
const sidebarTheme = {
	"--sidebar": "#000000",
	"--sidebar-foreground": "#ffffff",
	"--sidebar-border": "rgba(255, 255, 255, 0.2)",
	"--sidebar-muted": "rgba(255, 255, 255, 0.15)",
	"--sidebar-accent": "#85E408",
	"--sidebar-accent-foreground": "#000000",
} as React.CSSProperties;

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

function DashboardNavItem({ item }: { item: NavItem }) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const isActive = React.useMemo(() => {
		return pathname.startsWith(item.href);
	}, [item.href, pathname]);

	const itemClasses = [
		"flex w-full items-center gap-3 rounded-xl px-4 py-6 text-lg font-medium transition-all duration-200",
		isActive
			? "bg-[#85E408] text-black"
			: "text-white hover:bg-[#85E408]/10 hover:text-black",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
				<Link to={item.href} className={itemClasses}>
					<span>{item.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

function AppSidebar({
	user,
	onLogout,
}: {
	user: { name: string; email: string };
	onLogout: () => void;
}) {
	return (
		<Sidebar collapsible="none" className="border-none bg-[#101A00]">
			<SidebarHeader className="px-4">
				<div className="flex flex-col items-center justify-center text-center py-4">
					<div className="flex gap-4 justify-center">
						<img
							src="/logo.webp"
							alt="Adinko logo"
							className="h-16 w-16 brightness-0 invert"
						/>
						<img
							src="/logo-ghazi.webp"
							alt="Ghazisportshub logo"
							className="h-16 w-16"
						/>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent className="gap-8 px-4 py-6">
				<SidebarGroup className="gap-2">
					<SidebarGroupLabel className="text-white/70">Umum</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{primaryNav.map((item) => (
								<DashboardNavItem key={item.href} item={item} />
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup className="gap-2">
					<SidebarGroupLabel className="text-white/70">
						Perusahaan
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{perusahaanNav.map((item) => (
								<DashboardNavItem key={item.href} item={item} />
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="p-4">
				<div className="flex items-center justify-between rounded-xl bg-[#85E408]/10 p-3 ring-1 ring-[#85E408]/20">
					<div className="flex-1 truncate">
						<p className="truncate font-medium text-sm text-white">
							{user.name}
						</p>
						<p className="truncate text-xs text-white/70">{user.email}</p>
					</div>
					<Button
						size="icon"
						variant="ghost"
						onClick={onLogout}
						className="text-white transition-colors hover:bg-[#85E408] hover:text-black"
					>
						<LogOutIcon className="size-4" />
					</Button>
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

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

	const handleLogout = async () => {
		await authClient.signOut();
		window.location.href = "/login";
	};

	return (
		<SidebarProvider style={sidebarTheme}>
			<div className="flex min-h-svh w-full bg-background">
				<AppSidebar
					user={{ name: session.user.name, email: session.user.email }}
					onLogout={handleLogout}
				/>
				<SidebarInset>
					<div className="flex flex-1 flex-col">
						<div className="grow bg-[#F9F9F9] p-10">
							<Outlet />
						</div>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
