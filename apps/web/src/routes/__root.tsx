import { Toaster } from "@adinko/ui/components/sonner";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import appCss from "../index.css?url";
import { getJsonLd } from "@/lib/seo";

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
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	const jsonLd = getJsonLd();
	return (
		<html lang="id">
			<head>
				<HeadContent />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
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
