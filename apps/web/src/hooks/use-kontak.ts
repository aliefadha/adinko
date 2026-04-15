import { useRouteContext } from "@tanstack/react-router";
import { SITE_CONFIG } from "@/lib/seo";

export function useKontak() {
	const kontakData = useRouteContext({ from: "/_public" }).kontakData;

	const whatsappNumber = kontakData?.wa ?? SITE_CONFIG.whatsapp;
	const waNumber = whatsappNumber.startsWith("0")
		? "62" + whatsappNumber.slice(1)
		: whatsappNumber;
	const whatsappUrl = `https://wa.me/${waNumber}`;

	return {
		whatsappNumber,
		whatsappUrl,
		alamat: kontakData?.alamat ?? null,
		instagram: kontakData?.instagram ?? null,
		email: kontakData?.email ?? null,
	};
}
