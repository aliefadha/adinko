import { Toaster } from "@adinko/ui/components/sonner";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import appCss from "../index.css?url";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null
		: lazy(() =>
				import("@tanstack/react-router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

export interface RouterAppContext {
	session: {
		session: { id: string; expiresAt: string; token: string };
		user: { id: string; name: string; email: string; image: string | null };
	} | null;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title:
					"Adinko | Jasa Rumput Sintetis Pekanbaru & Pembuatan Lapangan Olahraga Profesional",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Outlet />
				<Toaster richColors />
				<Scripts />
				<Suspense>
					<TanStackRouterDevtools position="bottom-left" />
				</Suspense>
			</body>
		</html>
	);
}
