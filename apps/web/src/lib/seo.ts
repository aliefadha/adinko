export const SITE_CONFIG = {
	name: "Adinko",
	baseUrl: "https://adinkorumputsintetis.com",
	defaultTitle:
		"Adinko | Jasa Rumput Sintetis & Pembuatan Lapangan Olahraga Pekanbaru",
	defaultDescription:
		"Adinko menyediakan jasa rumput sintetis untuk taman, lapangan olahraga, dan playground di Pekanbaru dengan kualitas tinggi yang telah dipercaya oleh berbagai klien..",
	whatsapp: "6285264456566",
	whatsappUrl: "https://wa.me/6285264456566",
	address:
		"Jl. Todak No.113 Tangkerang Barat, Kec Marpoyan Damai, Kota Pekanbaru, Riau",
	googleMapsUrl:
		"https://maps.google.com/maps?q=Adinko.+rumput.+sintetis.+pekanbaru,+Pekanbaru&output=embed",
} as const;

type HeadEntry = {
	title?: string;
	name?: string;
	charSet?: string;
	content?: string;
	property?: string;
	rel?: string;
	href?: string;
	type?: string;
};

type HeadOutput = {
	title?: string;
	meta: HeadEntry[];
	links: HeadEntry[];
};

export function createPageMeta({
	title,
	description,
	path,
	image,
}: {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
}): HeadOutput {
	const fullTitle = title ? `${title}` : SITE_CONFIG.defaultTitle;
	const metaDescription = description ?? SITE_CONFIG.defaultDescription;
	const canonicalUrl = path
		? `${SITE_CONFIG.baseUrl}${path}`
		: SITE_CONFIG.baseUrl;
	const ogImage = image ?? `${SITE_CONFIG.baseUrl}/og-root.webp`;

	return {
		title: fullTitle,
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "robots", content: "index, follow" },
			{ name: "googlebot", content: "index, follow" },
			{ name: "description", content: metaDescription },
			{ property: "og:title", content: fullTitle },
			{ property: "og:description", content: metaDescription },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: canonicalUrl },
			{ property: "og:image", content: ogImage },
			{ property: "og:image:alt", content: fullTitle },
			{ property: "og:site_name", content: SITE_CONFIG.name },
			{ property: "og:locale", content: "id_ID" },
		],
		links: [
			{ rel: "canonical", href: canonicalUrl },
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
		],
	};
}

export function getJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: SITE_CONFIG.name,
		description: SITE_CONFIG.defaultDescription,
		url: SITE_CONFIG.baseUrl,
		telephone: `+62${SITE_CONFIG.whatsapp.replace(/^0/, "")}`,
		address: {
			"@type": "PostalAddress",
			streetAddress: "Jl. Todak No.113 Tangkerang Barat",
			addressLocality: "Pekanbaru",
			addressRegion: "Riau",
			addressCountry: "ID",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "0.4698",
			longitude: "101.4476",
		},
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			],
			opens: "08:00",
			closes: "18:00",
		},
		priceRange: "$$",
	};
}
