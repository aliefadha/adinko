import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { useState } from "react";

import { createPageMeta } from "@/lib/seo";
import { useKontak } from "@/hooks/use-kontak";
import { getGoogleReviews } from "@/functions/get-google-reviews";

type Testimoni = {
	id: string;
	kategoriId: string;
	kategoriNama: string | null;
	nama: string;
	testimoni: string;
	image: string | null;
	timeSpan: string | null;
	rating: number;
	createdAt: Date;
};

export const Route = createFileRoute("/_public/testimoni")({
	head: () =>
		createPageMeta({
			title: "Testimoni Klien",
			description:
				"Apa kata klien kami tentang Adinko. Lebih dari 1000 klien telah mempercayakan proyek rumput sintetis dan lapangan olahraga mereka kepada kami dengan hasil memuaskan.",
			path: "/testimoni",
		}),
	loader: async () => {
		const googleReviewsResponse = await getGoogleReviews();
		return {
			testimoniList: googleReviewsResponse.data as Testimoni[],
			nextPageToken: googleReviewsResponse.nextPageToken as string | null,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { whatsappUrl } = useKontak();
	return (
		<div>
			{/* ── Hero ── */}
			<section className="relative min-h-screen overflow-hidden rounded-b-3xl bg-[#F1F2F6]">
				{/* Background image */}
				<img
					src="/hero-testimoni.webp"
					alt="Lapangan rumput sintetis Adinko"
					className="absolute inset-0 w-full h-full object-top object-cover scale-120"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-[#171B11]/90 to-[#171B11]/20" />
				{/* Hero content */}
				<div className="relative z-10 text-center flex flex-col justify-center items-center min-h-screen px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto pb-16">
					{/* Badge */}
					<span className="mt-32 lg:mt-0 inline-flex items-center rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-1.5 text-xs lg:text-xl font-medium text-[#FBF9EF]">
						Kepuasan Klien adalah Prioritas Kami
					</span>
					{/* Headline */}
					<h1 className="mt-5 text-xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
						Apa Kata Klien Kami?
					</h1>
					{/* Description */}
					<p className="mt-4 text-xs sm:text-lg text-white/80 max-w-lg ">
						Berikut testimoni dari klien yang telah mempercayakan proyek mereka
						kepada kami. Hasil nyata, klien puas.
					</p>
				</div>
				{/* Floating WhatsApp button */}
				<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
					<span className="rounded-full bg-[#E0D28F] px-3 py-1 text-xs font-semibold text-[#3a5c00] shadow-md md:hidden">
						Pesan slot sekarang!
					</span>
					<span className="hidden md:inline rounded-full bg-[#E0D28F] px-3 py-1 text-xs font-semibold text-[#3a5c00] shadow-md">
						Slot terbatas - Pesan sekarang!
					</span>
					<a
						id="hero-whatsapp"
						href={whatsappUrl}
						target="_blank"
						rel="noreferrer"
						aria-label="Chat WhatsApp"
						className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-xl hover:scale-110 active:scale-95 transition-transform"
					>
						{/* WhatsApp SVG icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="white"
							className="w-7 h-7"
						>
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
							<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.878 9.878 0 0 1-5.031-1.376l-.36-.214-3.733.967.994-3.638-.234-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
						</svg>
					</a>
				</div>
			</section>
			{/* ── Testimoni ── */}
			<section className="bg-white py-12 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto">
					<TestimoniGrid />
				</div>
			</section>
		</div>
	);
}

function getAvatarData(nama: string) {
	const initials = nama
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
	const colors = [
		"#E97316",
		"#6B7280",
		"#518100",
		"#D5C167",
		"#25D366",
		"#E0D28F",
	];
	let hash = 0;
	for (let i = 0; i < nama.length; i++) {
		hash = nama.charCodeAt(i) + ((hash << 5) - hash);
	}
	const color = colors[Math.abs(hash) % colors.length];
	return { initials, color };
}

function TestimoniGrid() {
	const initialData = Route.useLoaderData();
	const [testimoniList, setTestimoniList] = useState(initialData.testimoniList);
	const [nextPageToken, setNextPageToken] = useState(initialData.nextPageToken);
	const [isLoading, setIsLoading] = useState(false);

	const hasMore = nextPageToken !== null;

	const loadMore = async () => {
		if (!nextPageToken || isLoading) return;
		setIsLoading(true);
		try {
			const response = await getGoogleReviews({
				data: { pageToken: nextPageToken },
			});
			setTestimoniList((prev) => [...prev, ...response.data]);
			setNextPageToken(response.nextPageToken);
		} catch (error) {
			console.error("Failed to load more reviews:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* Review grid */}
			{testimoniList.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
					{testimoniList.map((item) => {
						const { initials, color } = getAvatarData(item.nama);
						return (
							<div
								key={item.id}
								className="rounded-2xl p-5 flex flex-col justify-between gap-6 bg-[#F8F8F8] border border-gray-100"
							>
								<p className="text-sm font-semibold leading-relaxed flex-1">
									{item.testimoni}
								</p>
								<div className="flex items-center gap-3">
									{item.image ? (
										<img
											src={item.image}
											alt={item.nama}
											className="w-9 h-9 rounded-full object-cover shrink-0"
										/>
									) : (
										<span
											className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
											style={{ backgroundColor: color }}
										>
											{initials}
										</span>
									)}
									<div>
										<p className="text-sm font-semibold text-gray-900">
											{item.nama}
										</p>
										<div className="flex items-center gap-2">
											{item.timeSpan && (
												<p className="text-xs text-gray-400">{item.timeSpan}</p>
											)}
											<span className="flex gap-0.5 text-yellow-400">
												{Array.from({ length: item.rating }).map((_, i) => (
													<Star key={i} size={10} fill="currentColor" />
												))}
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<p className="text-center text-gray-500 py-12 mb-10">
					Belum ada testimoni untuk kategori ini.
				</p>
			)}

			{/* Load more */}
			{hasMore && (
				<div className="flex justify-center">
					<button
						type="button"
						id="testimoni-lihat-lebih"
						onClick={loadMore}
						disabled={isLoading}
						className="flex items-center gap-2 rounded-full bg-[#518100] px-7 py-3 text-white hover:bg-[#518100]/80 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							"Memuat..."
						) : (
							<>
								Lihat lebih banyak testimoni
								<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
									<ArrowRight size={13} />
								</span>
							</>
						)}
					</button>
				</div>
			)}
		</>
	);
}
