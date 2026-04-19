import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { createPageMeta } from "@/lib/seo";
import { useKontak } from "@/hooks/use-kontak";
import { getPortfolio } from "@/functions/get-portfolio";
import { getKategori } from "@/functions/get-kategori";

type Kategori = { id: string; nama: string; image: string | null };
type PortfolioImage = { id: string; image: string };
type Portfolio = {
	id: string;
	kategoriId: string;
	kategoriNama: string | null;
	title: string;
	subtitle: string | null;
	image: string | null;
	alamat: string | null;
	tahun: string | null;
	createdAt: Date;
	images: PortfolioImage[];
};

function ImageCarousel({ images }: { images: PortfolioImage[] }) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const checkScroll = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		const index = Math.round(el.scrollLeft / el.clientWidth);
		setActiveIndex(index);
	}, []);

	const scroll = (dir: "left" | "right") => {
		const el = scrollRef.current;
		if (!el) return;
		const amount = el.clientWidth;
		el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
	};

	if (images.length === 0) {
		return (
			<div className="w-full h-44 bg-gray-200 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
					className="w-10 h-10 text-gray-400"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
					/>
				</svg>
			</div>
		);
	}

	if (images.length === 1) {
		return (
			<img
				src={images[0].image}
				alt=""
				className="w-full h-44 object-cover"
			/>
		);
	}

	const canScrollLeft = activeIndex > 0;
	const canScrollRight = activeIndex < images.length - 1;

	return (
		<div className="relative group">
			<style>{`
				.carousel-scroll::-webkit-scrollbar { display: none; }
			`}</style>
			<div
				ref={scrollRef}
				onScroll={checkScroll}
				className="flex overflow-x-auto snap-x snap-mandatory carousel-scroll"
				style={{ scrollbarWidth: "none" }}
			>
				{images.map((img) => (
					<img
						key={img.id}
						src={img.image}
						alt=""
						className="w-full h-44 object-cover snap-center shrink-0"
					/>
				))}
			</div>
			{canScrollLeft && (
				<button
					type="button"
					onClick={() => scroll("left")}
					className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white/80 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
				>
					<ChevronLeftIcon className="size-4" />
				</button>
			)}
			{canScrollRight && (
				<button
					type="button"
					onClick={() => scroll("right")}
					className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white/80 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
				>
					<ChevronRightIcon className="size-4" />
				</button>
			)}
			{images.length > 1 && (
				<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
					{images.map((_, i) => (
						<div
							key={i}
							className={`size-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-white/50"}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export const Route = createFileRoute("/_public/portofolio")({
	head: () =>
		createPageMeta({
			title: "Portofolio Adinko dan Ghazi Sports Hub",
			description:
				"Hasil pekerjaan Adinko dari berbagai proyek rumput sintetis dan lapangan olahraga. Dari skala rumahan hingga komersial besar, setiap proyek adalah bukti komitmen kami terhadap kualitas.",
			path: "/portofolio",
		}),
	loader: async () => {
		const [kategoriResponse, portfolioResponse] = await Promise.all([
			getKategori(),
			getPortfolio(),
		]);
		return {
			kategoriList: kategoriResponse.data as Kategori[],
			portfolioList: portfolioResponse.data as Portfolio[],
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
				<img
					src="/hero-portofolio.webp"
					alt="Hasil pekerjaan Adinko"
					className="absolute inset-0 w-full h-full object-top object-cover scale-120"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-[#171B11]/90 to-[#171B11]/20" />
				<div className="relative z-10 text-center flex flex-col justify-center items-center min-h-screen px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto pb-16">
					<span className="mt-32 lg:mt-0 inline-flex items-center rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-1.5 text-xs lg:text-xl font-medium text-[#FBF9EF]">
						Hasil Nyata, Klien Puas
					</span>
					<h1 className="mt-5 text-xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
						Hasil Pekerjaan Kami
					</h1>
					<p className="mt-4 text-xs sm:text-lg text-white/80 ">
						Kami telah mengerjakan berbagai proyek dengan hasil memuaskan dari
						skala rumahan hingga komersial besar. Setiap proyek adalah bukti
						komitmen kami.
					</p>
				</div>
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

			{/* ── Portofolio ── */}
			<section className="bg-white py-12 px-6 sm:px-10 lg:px-20">
				<PortfolioGrid />
			</section>
		</div>
	);
}

function PortfolioGrid() {
	const { kategoriList, portfolioList } = Route.useLoaderData();
	const [activeKategoriId, setActiveKategoriId] = useState<string | null>(null);
	const [displayLimit, setDisplayLimit] = useState(9);

	const filteredPortfolio =
		activeKategoriId === null
			? portfolioList
			: portfolioList.filter((p) => p.kategoriId === activeKategoriId);

	const displayedPortfolio = filteredPortfolio.slice(0, displayLimit);
	const hasMore = filteredPortfolio.length > displayLimit;

	const tabs = [
		{ id: null, nama: "Semua", image: null },
		...kategoriList.map((k) => ({ id: k.id, nama: k.nama, image: k.image })),
	];

	return (
		<div className="max-w-6xl mx-auto">
			{/* Filter tabs */}
			<div className="flex flex-wrap gap-2 mb-10 justify-center">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id ?? "all"}
						onClick={() => {
							setActiveKategoriId(tab.id);
							setDisplayLimit(9);
						}}
						className={`relative rounded-full overflow-hidden px-5 py-2 text-sm font-medium transition-all ${activeKategoriId === tab.id ? "text-white" : "text-gray-900"
							}`}
					>
						{tab.image ? (
							<>
								<img
									src={tab.image}
									alt=""
									className="absolute inset-0 w-full h-full object-cover object-center"
								/>
								<div
									className={`absolute inset-0 ${activeKategoriId === tab.id ? "bg-black/50" : "bg-white/60"}`}
								/>
							</>
						) : (
							<div
								className={`absolute inset-0 rounded-full ${activeKategoriId === tab.id
										? "bg-gray-900"
										: "border border-gray-300 bg-white"
									}`}
							/>
						)}
						<span className="relative z-10">{tab.nama}</span>
					</button>
				))}
			</div>

			{/* Project grid */}
			{displayedPortfolio.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
					{displayedPortfolio.map((item) => (
						<div
							key={item.id}
							className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="relative">
								<ImageCarousel images={item.images || []} />
								<span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-700">
									{item.kategoriNama || "Lainnya"}
								</span>
							</div>
							<div className="p-4 flex flex-col gap-2">
								<h3 className="font-bold text-gray-900 text-sm">
									{item.title}
								</h3>
								<span className="inline-flex self-start rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
									{[item.alamat, item.tahun].filter(Boolean).join(" • ") ||
										"Tidak ada lokasi"}
								</span>
								{item.subtitle && (
									<p className="text-xs text-gray-500 leading-relaxed">
										{item.subtitle}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-center text-gray-500 py-12 mb-10">
					Belum ada portofolio untuk kategori ini.
				</p>
			)}

			{/* Load more */}
			{hasMore && (
				<div className="flex justify-center">
					<button
						type="button"
						id="portofolio-lihat-lebih"
						onClick={() => setDisplayLimit((prev) => prev + 6)}
						className="flex items-center gap-2 rounded-full bg-[#518100] px-7 py-3 font-semibold text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
					>
						Lihat lebih banyak proyek
						<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
							<ArrowRight size={16} />
						</span>
					</button>
				</div>
			)}
		</div>
	);
}