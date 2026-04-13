import { Toaster } from "@adinko/ui/components/sonner";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import appCss from "../index.css?url";
import { SITE_CONFIG, getJsonLd } from "@/lib/seo";

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
				title: SITE_CONFIG.defaultTitle,
			},
			{
				name: "description",
				content: SITE_CONFIG.defaultDescription,
			},
			{
				property: "og:title",
				content: SITE_CONFIG.defaultTitle,
			},
			{
				property: "og:description",
				content: SITE_CONFIG.defaultDescription,
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: SITE_CONFIG.baseUrl,
			},
			{
				property: "og:site_name",
				content: SITE_CONFIG.name,
			},
			{
				property: "og:locale",
				content: "id_ID",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: SITE_CONFIG.baseUrl,
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
