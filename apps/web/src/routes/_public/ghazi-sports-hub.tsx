import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { createPageMeta, SITE_CONFIG } from "@/lib/seo";

import { getPerusahaanByNama } from "@/functions/get-perusahaan-by-nama";
import { getPerusahaanTag } from "@/functions/get-perusahaan-tag";
import { getPerusahaanAlasan } from "@/functions/get-perusahaan-alasan";
import { getPerusahaanImage } from "@/functions/get-perusahaan-image";
import { getPerusahaanLayanan } from "@/functions/get-perusahaan-layanan";

export const Route = createFileRoute("/_public/ghazi-sports-hub")({
	head: () =>
		createPageMeta({
			title: "Tentang GhaziSportsHub",
			description:
				"GhaziSportsHub adalah spesialis pembangunan lapangan olahraga profesional di Pekanbaru. Futsal, minisoccer, padel, basket, tenis, badminton - standar konstruksi tinggi dan fasilitas tahan lama.",
			path: "/ghazi-sports-hub",
		}),
	loader: async () => {
		const [perusahaanRes, tagRes, alasanRes, imageRes, layananRes] =
			await Promise.all([
				getPerusahaanByNama({ data: { nama: "Ghazisportshub" } }),
				getPerusahaanTag({ data: { nama: "Ghazisportshub" } }),
				getPerusahaanAlasan({ data: { nama: "Ghazisportshub" } }),
				getPerusahaanImage({ data: { nama: "Ghazisportshub" } }),
				getPerusahaanLayanan({ data: { nama: "Ghazisportshub" } }),
			]);
		return {
			perusahaan: perusahaanRes.data,
			tags: (tagRes.data as { tag: string }[])?.map((t) => t.tag) ?? [],
			alasanList:
				(alasanRes.data as { alasan: string; sortOrder: number }[]) ?? [],
			images: (imageRes.data as { image: string }[]) ?? [],
			layananList:
				(layananRes.data as {
					title: string;
					subtitle: string | null;
					image: string | null;
					namaLayanan: string;
				}[]) ?? [],
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { perusahaan, tags, alasanList, images, layananList } =
		Route.useLoaderData();
	const [current, setCurrent] = useState(0);

	const carouselSlides =
		images.length > 0
			? images.map((img) => ({ src: img.image, alt: "GhaziSportsHub image" }))
			: [
					{ src: "/gallery-3.png", alt: "Lapangan futsal profesional" },
					{ src: "/gallery-4.png", alt: "Lapangan minisoccer GhaziSportsHub" },
					{
						src: "/layanan-komersial.png",
						alt: "Fasilitas olahraga komersial",
					},
				];

	const prev = () =>
		setCurrent((c) => (c - 1 + carouselSlides.length) % carouselSlides.length);
	const next = () => setCurrent((c) => (c + 1) % carouselSlides.length);

	return (
		<div>
			{/* ── Hero ── */}
			<section className="relative min-h-screen overflow-hidden rounded-b-3xl bg-[#F1F2F6]">
				<img
					src="/hero-ghazi.webp"
					alt="Lapangan rumput sintetis Adinko"
					className="absolute inset-0 w-full h-full object-top object-cover scale-120"
				/>

				<div className="absolute inset-0 bg-linear-to-r from-[#171B11]/90 to-[#171B11]/20" />

				{/* Hero content */}
				<div className="relative z-10 text-center flex flex-col justify-center items-center min-h-screen px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto pb-16">
					{/* Badge */}
					<span className="mt-32 lg:mt-0 inline-flex items-center rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-1.5 text-xs lg:text-xl font-medium text-[#FBF9EF]">
						Tentang GhaziSportsHub
					</span>

					{/* Headline */}
					<h1 className="mt-5 text-xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
						{perusahaan?.title ||
							"Lapangan Olahraga Profesional untuk Semua Kebutuhan"}
					</h1>

					{/* Description */}
					<p className="mt-4 text-xs sm:text-lg text-white/80 ">
						{perusahaan?.subtitle ||
							"Dari lapangan futsal hingga minisoccer dan padel, GhaziSportsHub menghadirkan fasilitas olahraga profesional dengan standar tertinggi di Pekanbaru."}
					</p>
				</div>

				{/* Floating WhatsApp button */}
				<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
					<span className="rounded-full bg-[#E0D28F] px-3 py-1 text-xs font-semibold text-[#3a5c00] shadow-md">
						Slot terbatas - Pesan sekarang!
					</span>
					<a
						id="hero-whatsapp"
						href={SITE_CONFIG.whatsappUrl}
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
			{/* ── Siapa Kami ── */}
			<section className="bg-[#F1F2F6] py-16 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
					{/* Left — text */}
					<div className="flex flex-col gap-6">
						<div>
							<p className="text-xs font-semibold tracking-widest text-[#518100] uppercase mb-3">
								Siapa Kami ?
							</p>
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
								Berpengalaman dalam Pembangunan Lapangan Olahraga Profesional
							</h2>
						</div>
						<p className="text-sm text-gray-600 leading-relaxed">
							GhaziSportsHub adalah spesialis pembangunan lapangan olahraga di
							Pekanbaru yang telah dipercaya oleh berbagai klien. Kami fokus
							pada standar konstruksi, kerapian pengerjaan, dan fasilitas yang
							tahan lama.
						</p>
						{/* Service category tabs - now dynamic from tags */}
						<div className="flex flex-wrap gap-2">
							{tags.length > 0
								? tags.map((tag, i) => (
										<button
											key={tag}
											type="button"
											className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
												i === 0
													? "bg-[#518100] text-white hover:bg-[#518100]/80"
													: "border border-[#518100] text-[#518100] hover:bg-[#518100]/10"
											}`}
										>
											{tag}
										</button>
									))
								: ["Lapangan Futsal", "Minisoccer", "Padel"].map((tab, i) => (
										<button
											key={tab}
											type="button"
											className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
												i === 0
													? "bg-[#518100] text-white hover:bg-[#518100]/80"
													: "border border-[#518100] text-[#518100] hover:bg-[#518100]/10"
											}`}
										>
											{tab}
										</button>
									))}
						</div>
					</div>

					{/* Right — carousel */}
					<div className="relative rounded-3xl overflow-hidden group">
						{/* Slides */}
						<div className="relative w-full h-80">
							{carouselSlides.map((slide, i) => (
								<img
									key={slide.src}
									src={slide.src}
									alt={slide.alt}
									className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
										i === current
											? "opacity-100"
											: "opacity-0 pointer-events-none"
									}`}
								/>
							))}
						</div>

						{/* Prev */}
						<button
							type="button"
							onClick={prev}
							aria-label="Previous"
							className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all shadow"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-4 h-4"
							>
								<path
									fillRule="evenodd"
									d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						{/* Next */}
						<button
							type="button"
							onClick={next}
							aria-label="Next"
							className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all shadow"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-4 h-4"
							>
								<path
									fillRule="evenodd"
									d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						{/* Dot indicators */}
						<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
							{carouselSlides.map((_, i) => (
								<button
									key={i}
									type="button"
									onClick={() => setCurrent(i)}
									aria-label={`Slide ${i + 1}`}
									className={`w-2 h-2 rounded-full transition-all ${
										i === current ? "bg-white w-4" : "bg-white/50"
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── Visi & Misi ── */}
			<section className="bg-white py-16 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto">
					{/* Header row */}
					<div className="grid lg:grid-cols-2 gap-8 mb-12">
						<div>
							<p className="text-xs font-semibold tracking-widest text-[#518100] uppercase mb-3">
								Visi &amp; Misi
							</p>
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
								Tumbuh Menjadi Penyedia Terpercaya di Pekanbaru
							</h2>
						</div>
						<p className="text-sm text-gray-500 leading-relaxed lg:pt-10">
							Kami berkomitmen memberikan layanan terbaik lewat kualitas produk,
							pelayanan profesional, dan kepuasan pelanggan.
						</p>
					</div>

					{/* Content row */}
					<div className="grid lg:grid-cols-2 gap-6">
						{/* Left — image card with Nilai Kami overlay */}
						<div className="relative rounded-3xl overflow-hidden">
							<img
								src="/nilai-ghazi.webp"
								alt="Nilai GhaziSportsHub"
								className="w-full h-full min-h-72 object-cover object-bottom"
							/>
							{/* Dark overlay + text */}
							<div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
								<p className="font-bold text-white text-xl mb-3">Nilai Kami</p>
								<div className="flex flex-wrap gap-2">
									{tags.length > 0
										? tags.slice(0, 3).map((v) => (
												<span
													key={v}
													className="rounded-full border border-white/50 bg-white/10 backdrop-blur-sm px-4 py-1 text-xs font-medium text-white"
												>
													{v}
												</span>
											))
										: ["Kualitas", "Kepercayaan", "Profesionalisme"].map(
												(v) => (
													<span
														key={v}
														className="rounded-full border border-white/50 bg-white/10 backdrop-blur-sm px-4 py-1 text-xs font-medium text-white"
													>
														{v}
													</span>
												),
											)}
								</div>
							</div>
						</div>

						{/* Right — Visi + Misi cards */}
						<div className="flex flex-col gap-4">
							{/* Visi */}
							<div className="rounded-2xl bg-[#ECF3E0] p-6">
								<p className="font-bold text-gray-900 mb-2">Visi Kami</p>
								<p className="text-sm text-gray-600 leading-relaxed">
									{perusahaan?.visi ||
										"Menjadi penyedia solusi rumput sintetis dan fasilitas olahraga terbaik di Pekanbaru dan sekitarnya."}
								</p>
							</div>

							{/* Misi */}
							<div className="rounded-2xl bg-[#518100] p-6 flex-1">
								<p className="font-bold text-white mb-4">Misi Kami</p>
								<ul className="flex flex-col gap-3">
									{perusahaan?.misi
										? perusahaan.misi.split("\n").map((item: string) => (
												<li
													key={item}
													className="flex items-start gap-3 text-sm text-white/90"
												>
													<span className="mt-0.5 w-4 h-4 rounded-full border-2 border-white/60 shrink-0" />
													{item}
												</li>
											))
										: [
												"Memberikan produk berkualitas tinggi dengan material premium terpilih",
												"Pelayanan profesional",
												"Harga kompetitif",
												"Pengerjaan tepat waktu",
											].map((item) => (
												<li
													key={item}
													className="flex items-start gap-3 text-sm text-white/90"
												>
													<span className="mt-0.5 w-4 h-4 rounded-full border-2 border-white/60 shrink-0" />
													{item}
												</li>
											))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── Kenapa Memilih Kami ── */}
			<section className="bg-[#F1F2F6] py-16 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto">
					<p className="text-center text-xs font-semibold tracking-widest text-[#518100] uppercase mb-3">
						Kenapa Memilih Kami ?
					</p>
					<h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
						Kami Mengutamakan Kualitas
						<br className="hidden sm:block" /> di Setiap Detail
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{alasanList.length > 0
							? alasanList
									.sort((a, b) => a.sortOrder - b.sortOrder)
									.slice(0, 4)
									.map((item, i) => ({
										num: String(i + 1).padStart(3, "0"),
										label: item.alasan,
										active: i === 0,
										index: i,
									}))
									.map(({ num, label, active }, index) => (
										<div
											key={num}
											className={`rounded-2xl p-5 flex flex-col justify-between gap-8 min-h-44 ${active
											? "border-2 border-[#518100] bg-white"
											: "bg-white border border-gray-100"
											}`}
										>
											<div className="flex justify-end w-full">
												<span className="text-xs text-gray-300 font-medium">
													{num}
												</span>
											</div>
											<div className="flex flex-col gap-4 mt-auto">
												<span
													className={
														active ? "text-[#518100]" : "text-gray-400"
													}
												>
													{index === 0 ? (
													<svg
														className="w-12 h-12 object-cover"
														width="62"
														height="63"
														viewBox="0 0 62 63"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M17.0499 9.44995C16.782 9.44989 16.5187 9.52038 16.2856 9.65453C16.0526 9.78868 15.8577 9.98192 15.72 10.2154L6.42 25.9654C6.25491 26.2457 6.17965 26.5711 6.20464 26.8968C6.22964 27.2224 6.35364 27.5321 6.5595 27.7829L29.8095 56.1329C29.955 56.3102 30.137 56.4528 30.3427 56.5507C30.5484 56.6485 30.7728 56.6992 30.9999 56.6992C31.227 56.6992 31.4514 56.6485 31.6571 56.5507C31.8628 56.4528 32.0448 56.3102 32.1903 56.1329L55.4403 27.7829C55.6462 27.5321 55.7702 27.2224 55.7951 26.8968C55.8201 26.5711 55.7449 26.2457 55.5798 25.9654L46.2798 10.2154C46.1421 9.98192 45.9472 9.78868 45.7142 9.65453C45.4811 9.52038 45.2178 9.44989 44.9499 9.44995H17.0499ZM10.4872 25.2L17.9272 12.6H24.0621L19.1021 25.2H10.4872ZM19.0897 28.35L26.1174 46.7113L11.0607 28.35H19.0897ZM30.9999 50.778L22.416 28.35H39.5838L30.9999 50.778ZM22.4408 25.2L27.4008 12.6H34.599L39.559 25.2H22.4408ZM42.9008 25.2L37.9408 12.6H44.0726L51.5126 25.2H42.9008ZM42.9101 28.35H50.9391L35.8824 46.7113L42.9101 28.35Z"
															fill="#518100"
														/>
													</svg>
												) : index === 1 ? (
													<svg
														width="72"
														height="72"
														viewBox="0 0 72 72"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M55.239 20.4645L51.75 9.1665L48.261 20.4645L41.511 23.679L48.291 26.907L51.75 36.792L55.209 26.907L61.989 23.679L55.239 20.4645ZM50.739 22.6065L51.75 19.3335L52.761 22.608L55.011 23.679L52.791 24.7365L51.75 27.7095L50.709 24.7365L48.489 23.679L50.739 22.6065Z"
															fill="#626874"
														/>
														<path
															d="M28.5 24L30 18L31.5 24L36 25.5L31.5 27L30 33L28.5 27L24 25.5L28.5 24Z"
															fill="#626874"
														/>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M19.5 59.6251V59.9941C19.5 60.7898 19.1839 61.5528 18.6213 62.1154C18.0587 62.678 17.2956 62.9941 16.5 62.9941H12C11.2044 62.9941 10.4413 62.678 9.87868 62.1154C9.31607 61.5528 9 60.7898 9 59.9941V43.5016C9 42.706 9.31607 41.9429 9.87868 41.3803C10.4413 40.8177 11.2044 40.5016 12 40.5016H16.5C17.1756 40.5013 17.8316 40.7291 18.3616 41.1481C18.8917 41.567 19.2648 42.1527 19.4205 42.8101C21.4065 42.0946 23.727 41.2426 24.4365 40.9186C25.0395 40.6441 25.7355 40.5511 26.3145 40.5166C26.912 40.4874 27.5109 40.4979 28.107 40.5481C28.7744 40.6024 29.4391 40.6865 30.099 40.8001L30.1335 40.8061L30.144 40.8076H30.1485L30.1755 40.8136L40.2105 43.0636L40.272 43.0846L40.2885 43.0906L40.3575 43.1116L40.641 43.1926C40.8885 43.2616 41.244 43.3531 41.6685 43.4461C42.531 43.6336 43.6185 43.8091 44.631 43.8091C45.567 43.8091 46.536 44.1586 47.052 45.1066C47.496 45.9196 47.3925 46.8136 47.2275 47.4316C47.019 48.2026 46.59 49.0126 46.0455 49.7011C46.7805 49.4236 47.586 49.0951 48.45 48.7411L48.6345 48.6661C51.069 47.6656 53.955 46.4806 56.502 46.0606C59.412 45.5791 61.5285 46.6351 62.4885 48.5086C63.3435 50.1766 63.1455 52.3651 61.8585 53.6836C61.536 54.0151 61.044 54.3631 60.5505 54.6826C60.0225 55.0261 59.373 55.4116 58.6515 55.8226C56.9939 56.7506 55.316 57.6418 53.619 58.4956C50.061 60.3001 46.332 62.0551 45.147 62.4886C43.773 62.9911 42.297 63.0391 40.8795 62.9656C40.0235 62.9124 39.1688 62.8399 38.316 62.7481C37.6917 62.6835 37.0666 62.626 36.441 62.5756C33.549 62.3566 31.329 61.6501 29.286 61.0006L29.037 60.9211C26.925 60.2521 24.96 59.6566 22.3575 59.5516C21.7635 59.5276 20.5755 59.5741 19.5 59.6251ZM25.68 43.6471C25.7775 43.6021 26.0325 43.5376 26.487 43.5106C26.913 43.4851 27.399 43.5016 27.8745 43.5376C28.4434 43.5842 29.0099 43.6558 29.5725 43.7521H29.577L39.4275 45.9616L39.495 45.9826C39.578 46.0086 39.693 46.0416 39.84 46.0816C40.131 46.1626 40.542 46.2691 41.0295 46.3756C41.907 46.5676 43.0845 46.7686 44.2815 46.8031C44.1749 47.0917 44.0317 47.3654 43.8555 47.6176C43.6155 47.9656 43.353 48.2341 43.137 48.3886C42.513 48.8356 42.009 49.0216 41.703 49.1011C41.5988 49.1299 41.4925 49.15 41.385 49.1611H41.352L33.309 49.0651L33.024 52.0411L33.1035 52.0561L33.333 52.0966L34.167 52.2436C34.8675 52.3666 35.829 52.5316 36.876 52.7026C38.937 53.0386 41.421 53.4106 42.831 53.4961C43.806 53.5561 44.94 53.2561 45.9945 52.9036C47.094 52.5361 48.3375 52.0276 49.5885 51.5146C52.164 50.4586 54.7875 49.3831 56.991 49.0186C58.896 48.7036 59.5755 49.3996 59.8185 49.8751C60.168 50.5576 59.979 51.3151 59.7105 51.5881C59.646 51.6556 59.4105 51.8461 58.9185 52.1656C58.4595 52.4611 57.867 52.8166 57.171 53.2111C55.5544 54.1161 53.918 54.9853 52.263 55.8181C48.675 57.6376 45.105 59.3071 44.115 59.6701C43.314 59.9641 42.3225 60.0346 41.034 59.9686C40.2749 59.924 39.5172 59.8595 38.7615 59.7751C38.0644 59.7017 37.3663 59.6377 36.6675 59.5831C34.1295 59.3911 32.2005 58.7776 30.132 58.1206L29.9445 58.0606C27.8025 57.3811 25.5105 56.6746 22.479 56.5531C21.7965 56.5261 20.5815 56.5681 19.5 56.6191V45.9676C21.609 45.2131 24.7305 44.0806 25.68 43.6471ZM16.5 43.5001H12V59.9926H16.5V43.5001Z"
															fill="#626874"
														/>
													</svg>
												) : index === 2 ? (
													<svg
														className="w-12 h-12 object-cover"
														width="62"
														height="62"
														viewBox="0 0 62 62"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M58.1251 11.6251C58.119 9.61538 57.331 7.68695 55.9278 6.24818C54.5247 4.80941 52.6166 3.97328 50.6077 3.91687C48.5988 3.86046 46.6468 4.58819 45.1651 5.94596C43.6835 7.30372 42.7885 9.18489 42.6696 11.1911L18.573 16.0096C18.0096 14.8387 17.1601 13.8286 16.103 13.0728C15.0459 12.317 13.8154 11.8398 12.5251 11.6854C11.2349 11.5311 9.92652 11.7044 8.72098 12.1895C7.51544 12.6746 6.45162 13.4557 5.62786 14.4607C4.8041 15.4657 4.24696 16.6622 4.00796 17.9395C3.76895 19.2168 3.85578 20.5337 4.26042 21.7686C4.66506 23.0034 5.37446 24.1164 6.32304 25.0045C7.27163 25.8927 8.42879 26.5274 9.68758 26.8499V42.9002C8.36544 43.239 7.15649 43.9216 6.1835 44.8788C5.21051 45.8359 4.50812 47.0335 4.14766 48.3499C3.7872 49.6663 3.7815 51.0547 4.13115 52.374C4.48079 53.6933 5.17332 54.8966 6.13843 55.8617C7.10353 56.8268 8.30684 57.5194 9.62616 57.869C10.9455 58.2187 12.3338 58.213 13.6502 57.8525C14.9666 57.492 16.1642 56.7896 17.1214 55.8167C18.0785 54.8437 18.7612 53.6347 19.1 52.3126H35.1502C35.4723 53.5722 36.1068 54.7303 36.995 55.6797C37.8832 56.6291 38.9965 57.3393 40.2319 57.7445C41.4673 58.1497 42.7849 58.2368 44.0629 57.9978C45.3409 57.7589 46.5381 57.2015 47.5436 56.3773C48.5491 55.5532 49.3306 54.4887 49.8158 53.2825C50.3009 52.0763 50.4741 50.7672 50.3193 49.4763C50.1645 48.1854 49.6867 46.9543 48.93 45.897C48.1734 44.8397 47.1624 43.9903 45.9905 43.4272L50.8091 19.3305C52.7815 19.2222 54.6379 18.3639 55.998 16.9314C57.3582 15.4988 58.1191 13.6005 58.1251 11.6251ZM50.3751 7.75007C51.1415 7.75007 51.8907 7.97734 52.5279 8.40313C53.1652 8.82892 53.6618 9.43411 53.9551 10.1422C54.2484 10.8502 54.3251 11.6294 54.1756 12.3811C54.0261 13.1327 53.657 13.8232 53.1151 14.3651C52.5732 14.907 51.8827 15.2761 51.1311 15.4256C50.3794 15.5751 49.6002 15.4984 48.8922 15.2051C48.1841 14.9118 47.5789 14.4151 47.1531 13.7779C46.7273 13.1407 46.5001 12.3915 46.5001 11.6251C46.5001 10.5974 46.9083 9.61174 47.635 8.88504C48.3617 8.15833 49.3474 7.75007 50.3751 7.75007ZM7.75008 19.3751C7.75008 18.6087 7.97735 17.8595 8.40314 17.2222C8.82893 16.585 9.43412 16.0883 10.1422 15.795C10.8502 15.5018 11.6294 15.425 12.3811 15.5745C13.1327 15.724 13.8232 16.0931 14.3651 16.635C14.9071 17.177 15.2761 17.8674 15.4256 18.6191C15.5751 19.3708 15.4984 20.1499 15.2051 20.858C14.9118 21.566 14.4152 22.1712 13.7779 22.597C13.1407 23.0228 12.3915 23.2501 11.6251 23.2501C10.5974 23.2501 9.61175 22.8418 8.88504 22.1151C8.15834 21.3884 7.75008 20.4028 7.75008 19.3751ZM11.6251 54.2501C10.8587 54.2501 10.1095 54.0228 9.47225 53.597C8.83501 53.1712 8.33834 52.566 8.04505 51.858C7.75176 51.1499 7.67502 50.3708 7.82454 49.6191C7.97406 48.8674 8.34312 48.177 8.88504 47.635C9.42697 47.0931 10.1174 46.724 10.8691 46.5745C11.6208 46.425 12.3999 46.5018 13.108 46.795C13.816 47.0883 14.4212 47.585 14.847 48.2222C15.2728 48.8595 15.5001 49.6087 15.5001 50.3751C15.5001 51.4028 15.0918 52.3884 14.3651 53.1151C13.6384 53.8418 12.6528 54.2501 11.6251 54.2501ZM35.1502 48.4376H19.1C18.7518 47.106 18.0553 45.8912 17.0821 44.918C16.1089 43.9448 14.8941 43.2484 13.5626 42.9002V26.8499C15.1452 26.4374 16.5561 25.5335 17.5926 24.2683C18.629 23.0032 19.2375 21.4419 19.3305 19.8091L43.4272 14.9905C44.1859 16.553 45.4476 17.8153 47.0096 18.5749L42.1911 42.6696C40.5582 42.7627 38.997 43.3711 37.7318 44.4076C36.4666 45.444 35.5628 46.855 35.1502 48.4376ZM42.6251 54.2501C41.8587 54.2501 41.1095 54.0228 40.4722 53.597C39.835 53.1712 39.3383 52.566 39.045 51.858C38.7518 51.1499 38.675 50.3708 38.8245 49.6191C38.9741 48.8674 39.3431 48.177 39.885 47.635C40.427 47.0931 41.1174 46.724 41.8691 46.5745C42.6208 46.425 43.3999 46.5018 44.108 46.795C44.816 47.0883 45.4212 47.585 45.847 48.2222C46.2728 48.8595 46.5001 49.6087 46.5001 50.3751C46.5001 51.4028 46.0918 52.3884 45.3651 53.1151C44.6384 53.8418 43.6528 54.2501 42.6251 54.2501Z"
															fill="#626874"
														/>
													</svg>
												) : (
													<svg
														className="w-12 h-12 object-cover"
														width="62"
														height="62"
														viewBox="0 0 62 62"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g clipPath="url(#clip0_43_515)">
															<path
																d="M36.177 26.4646C35.9314 26.4629 35.6951 26.5585 35.5197 26.7304C35.3443 26.9023 35.2441 27.1366 35.2408 27.3822V34.2394C35.2441 34.4855 35.3448 34.7203 35.5208 34.8923C35.6969 34.9643 35.934 35.1595 36.1801 35.157H56.8354C57.0815 35.1595 57.3186 35.0643 57.4947 34.8923C57.6707 34.7203 57.7714 34.4855 57.7747 34.2394V27.3822C57.7714 27.1361 57.6707 26.9013 57.4947 26.7293C57.3186 26.5573 57.0815 26.4621 56.8354 26.4646H36.177ZM48.8436 4.653C51.7018 4.7894 53.7571 5.3536 55.0591 6.5502C56.3456 7.7344 57.0059 9.4487 57.1361 11.7179V18.2186C57.1296 18.7722 56.9036 19.3006 56.5077 19.6877C56.1119 20.0748 55.5786 20.289 55.025 20.2832C54.7506 20.2865 54.4783 20.2357 54.2235 20.1337C53.9688 20.0317 53.7366 19.8805 53.5403 19.6888C53.3439 19.4971 53.1873 19.2686 53.0793 19.0163C52.9713 18.7641 52.914 18.493 52.9108 18.2186L52.9139 11.8357C52.8457 10.6577 52.5636 9.9261 52.1606 9.5541C51.77 9.1945 50.5796 8.8721 48.7413 8.7791H8.2057C6.541 8.8411 5.4591 9.1573 4.9352 9.6068C4.5322 9.9509 4.2284 10.8995 4.2253 12.5394L4.216 49.0264C4.371 50.6198 4.7213 51.6831 5.1708 52.2132C5.5118 52.6162 6.5689 53.0192 8.1251 53.2176H48.7847C50.6881 53.2548 51.8103 52.9696 52.1885 52.5883C52.607 52.1636 52.9108 51.0476 52.9108 49.2217V42.8822C52.9108 41.7445 53.8563 40.8176 55.025 40.8176C56.1906 40.8176 57.1361 41.7445 57.1361 42.8822V49.2217C57.1361 52.0117 56.5657 54.098 55.2296 55.4527C53.8532 56.8477 51.6646 57.4057 48.7413 57.3437L7.874 57.3344C5.0933 57.012 3.1 56.2494 1.9127 54.8451C0.837 53.5741 0.2387 51.7606 0 49.2248V12.5363C0.0062 9.8207 0.6572 7.7778 2.1514 6.5006C3.5216 5.3226 5.4994 4.7491 8.1251 4.6499L48.8436 4.653ZM56.8354 22.3354C59.6874 22.3354 62 24.5953 62 27.3822V34.2394C62 37.0263 59.6874 39.2862 56.8354 39.2862H36.1801C33.3281 39.2862 31.0155 37.0232 31.0155 34.2394V27.3822C31.0155 24.5953 33.3281 22.3354 36.1801 22.3354H56.8354ZM41.3447 28.3494C39.9187 28.3494 38.7624 29.4654 38.7624 30.8387C38.7624 32.212 39.9187 33.328 41.3447 33.328C42.7707 33.328 43.927 32.212 43.927 30.8387C43.927 29.4654 42.7707 28.3463 41.3447 28.3463"
																fill="#626874"
															/>
														</g>
														<defs>
															<clipPath id="clip0_43_515">
																<rect width="62" height="62" fill="white" />
															</clipPath>
														</defs>
													</svg>
												)}
												</span>
												<p className="text-sm font-medium text-gray-800 leading-snug">
													{label}
												</p>
											</div>
										</div>
									))
							: [
									{
										num: "001",
										label: "Material rumput sintetis berkualitas premium",
										active: true,
									},
									{
										num: "002",
										label: "Pemasangan rapi & presisi",
										active: false,
									},
									{
										num: "003",
										label: "Bisa custom sesuai kebutuhan desain",
										active: false,
									},
									{
										num: "004",
										label: "Harga transparan tanpa biaya tersembunyi",
										active: false,
									},
								].map(({ num, label, active }, index) => (
									<div
										key={num}
										className={`rounded-2xl p-5 flex flex-col justify-between gap-8 min-h-44 ${
											active
												? "border-2 border-[#518100] bg-white"
												: "bg-white border border-gray-100"
										}`}
									>
										<div className="flex justify-end w-full">
											<span className="text-xs text-gray-300 font-medium">
												{num}
											</span>
										</div>
										<div className="flex flex-col gap-4 mt-auto">
											<span
												className={active ? "text-[#518100]" : "text-gray-400"}
											>
												{index === 0 ? (
													<svg
														className="w-12 h-12 object-cover"
														width="62"
														height="63"
														viewBox="0 0 62 63"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M17.0499 9.44995C16.782 9.44989 16.5187 9.52038 16.2856 9.65453C16.0526 9.78868 15.8577 9.98192 15.72 10.2154L6.42 25.9654C6.25491 26.2457 6.17965 26.5711 6.20464 26.8968C6.22964 27.2224 6.35364 27.5321 6.5595 27.7829L29.8095 56.1329C29.955 56.3102 30.137 56.4528 30.3427 56.5507C30.5484 56.6485 30.7728 56.6992 30.9999 56.6992C31.227 56.6992 31.4514 56.6485 31.6571 56.5507C31.8628 56.4528 32.0448 56.3102 32.1903 56.1329L55.4403 27.7829C55.6462 27.5321 55.7702 27.2224 55.7951 26.8968C55.8201 26.5711 55.7449 26.2457 55.5798 25.9654L46.2798 10.2154C46.1421 9.98192 45.9472 9.78868 45.7142 9.65453C45.4811 9.52038 45.2178 9.44989 44.9499 9.44995H17.0499ZM10.4872 25.2L17.9272 12.6H24.0621L19.1021 25.2H10.4872ZM19.0897 28.35L26.1174 46.7113L11.0607 28.35H19.0897ZM30.9999 50.778L22.416 28.35H39.5838L30.9999 50.778ZM22.4408 25.2L27.4008 12.6H34.599L39.559 25.2H22.4408ZM42.9008 25.2L37.9408 12.6H44.0726L51.5126 25.2H42.9008ZM42.9101 28.35H50.9391L35.8824 46.7113L42.9101 28.35Z"
															fill="#518100"
														/>
													</svg>
												) : index === 1 ? (
													<svg
														width="72"
														height="72"
														viewBox="0 0 72 72"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M55.239 20.4645L51.75 9.1665L48.261 20.4645L41.511 23.679L48.291 26.907L51.75 36.792L55.209 26.907L61.989 23.679L55.239 20.4645ZM50.739 22.6065L51.75 19.3335L52.761 22.608L55.011 23.679L52.791 24.7365L51.75 27.7095L50.709 24.7365L48.489 23.679L50.739 22.6065Z"
															fill="#626874"
														/>
														<path
															d="M28.5 24L30 18L31.5 24L36 25.5L31.5 27L30 33L28.5 27L24 25.5L28.5 24Z"
															fill="#626874"
														/>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M19.5 59.6251V59.9941C19.5 60.7898 19.1839 61.5528 18.6213 62.1154C18.0587 62.678 17.2956 62.9941 16.5 62.9941H12C11.2044 62.9941 10.4413 62.678 9.87868 62.1154C9.31607 61.5528 9 60.7898 9 59.9941V43.5016C9 42.706 9.31607 41.9429 9.87868 41.3803C10.4413 40.8177 11.2044 40.5016 12 40.5016H16.5C17.1756 40.5013 17.8316 40.7291 18.3616 41.1481C18.8917 41.567 19.2648 42.1527 19.4205 42.8101C21.4065 42.0946 23.727 41.2426 24.4365 40.9186C25.0395 40.6441 25.7355 40.5511 26.3145 40.5166C26.912 40.4874 27.5109 40.4979 28.107 40.5481C28.7744 40.6024 29.4391 40.6865 30.099 40.8001L30.1335 40.8061L30.144 40.8076H30.1485L30.1755 40.8136L40.2105 43.0636L40.272 43.0846L40.2885 43.0906L40.3575 43.1116L40.641 43.1926C40.8885 43.2616 41.244 43.3531 41.6685 43.4461C42.531 43.6336 43.6185 43.8091 44.631 43.8091C45.567 43.8091 46.536 44.1586 47.052 45.1066C47.496 45.9196 47.3925 46.8136 47.2275 47.4316C47.019 48.2026 46.59 49.0126 46.0455 49.7011C46.7805 49.4236 47.586 49.0951 48.45 48.7411L48.6345 48.6661C51.069 47.6656 53.955 46.4806 56.502 46.0606C59.412 45.5791 61.5285 46.6351 62.4885 48.5086C63.3435 50.1766 63.1455 52.3651 61.8585 53.6836C61.536 54.0151 61.044 54.3631 60.5505 54.6826C60.0225 55.0261 59.373 55.4116 58.6515 55.8226C56.9939 56.7506 55.316 57.6418 53.619 58.4956C50.061 60.3001 46.332 62.0551 45.147 62.4886C43.773 62.9911 42.297 63.0391 40.8795 62.9656C40.0235 62.9124 39.1688 62.8399 38.316 62.7481C37.6917 62.6835 37.0666 62.626 36.441 62.5756C33.549 62.3566 31.329 61.6501 29.286 61.0006L29.037 60.9211C26.925 60.2521 24.96 59.6566 22.3575 59.5516C21.7635 59.5276 20.5755 59.5741 19.5 59.6251ZM25.68 43.6471C25.7775 43.6021 26.0325 43.5376 26.487 43.5106C26.913 43.4851 27.399 43.5016 27.8745 43.5376C28.4434 43.5842 29.0099 43.6558 29.5725 43.7521H29.577L39.4275 45.9616L39.495 45.9826C39.578 46.0086 39.693 46.0416 39.84 46.0816C40.131 46.1626 40.542 46.2691 41.0295 46.3756C41.907 46.5676 43.0845 46.7686 44.2815 46.8031C44.1749 47.0917 44.0317 47.3654 43.8555 47.6176C43.6155 47.9656 43.353 48.2341 43.137 48.3886C42.513 48.8356 42.009 49.0216 41.703 49.1011C41.5988 49.1299 41.4925 49.15 41.385 49.1611H41.352L33.309 49.0651L33.024 52.0411L33.1035 52.0561L33.333 52.0966L34.167 52.2436C34.8675 52.3666 35.829 52.5316 36.876 52.7026C38.937 53.0386 41.421 53.4106 42.831 53.4961C43.806 53.5561 44.94 53.2561 45.9945 52.9036C47.094 52.5361 48.3375 52.0276 49.5885 51.5146C52.164 50.4586 54.7875 49.3831 56.991 49.0186C58.896 48.7036 59.5755 49.3996 59.8185 49.8751C60.168 50.5576 59.979 51.3151 59.7105 51.5881C59.646 51.6556 59.4105 51.8461 58.9185 52.1656C58.4595 52.4611 57.867 52.8166 57.171 53.2111C55.5544 54.1161 53.918 54.9853 52.263 55.8181C48.675 57.6376 45.105 59.3071 44.115 59.6701C43.314 59.9641 42.3225 60.0346 41.034 59.9686C40.2749 59.924 39.5172 59.8595 38.7615 59.7751C38.0644 59.7017 37.3663 59.6377 36.6675 59.5831C34.1295 59.3911 32.2005 58.7776 30.132 58.1206L29.9445 58.0606C27.8025 57.3811 25.5105 56.6746 22.479 56.5531C21.7965 56.5261 20.5815 56.5681 19.5 56.6191V45.9676C21.609 45.2131 24.7305 44.0806 25.68 43.6471ZM16.5 43.5001H12V59.9926H16.5V43.5001Z"
															fill="#626874"
														/>
													</svg>
												) : index === 2 ? (
													<svg
														className="w-12 h-12 object-cover"
														width="62"
														height="62"
														viewBox="0 0 62 62"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M58.1251 11.6251C58.119 9.61538 57.331 7.68695 55.9278 6.24818C54.5247 4.80941 52.6166 3.97328 50.6077 3.91687C48.5988 3.86046 46.6468 4.58819 45.1651 5.94596C43.6835 7.30372 42.7885 9.18489 42.6696 11.1911L18.573 16.0096C18.0096 14.8387 17.1601 13.8286 16.103 13.0728C15.0459 12.317 13.8154 11.8398 12.5251 11.6854C11.2349 11.5311 9.92652 11.7044 8.72098 12.1895C7.51544 12.6746 6.45162 13.4557 5.62786 14.4607C4.8041 15.4657 4.24696 16.6622 4.00796 17.9395C3.76895 19.2168 3.85578 20.5337 4.26042 21.7686C4.66506 23.0034 5.37446 24.1164 6.32304 25.0045C7.27163 25.8927 8.42879 26.5274 9.68758 26.8499V42.9002C8.36544 43.239 7.15649 43.9216 6.1835 44.8788C5.21051 45.8359 4.50812 47.0335 4.14766 48.3499C3.7872 49.6663 3.7815 51.0547 4.13115 52.374C4.48079 53.6933 5.17332 54.8966 6.13843 55.8617C7.10353 56.8268 8.30684 57.5194 9.62616 57.869C10.9455 58.2187 12.3338 58.213 13.6502 57.8525C14.9666 57.492 16.1642 56.7896 17.1214 55.8167C18.0785 54.8437 18.7612 53.6347 19.1 52.3126H35.1502C35.4723 53.5722 36.1068 54.7303 36.995 55.6797C37.8832 56.6291 38.9965 57.3393 40.2319 57.7445C41.4673 58.1497 42.7849 58.2368 44.0629 57.9978C45.3409 57.7589 46.5381 57.2015 47.5436 56.3773C48.5491 55.5532 49.3306 54.4887 49.8158 53.2825C50.3009 52.0763 50.4741 50.7672 50.3193 49.4763C50.1645 48.1854 49.6867 46.9543 48.93 45.897C48.1734 44.8397 47.1624 43.9903 45.9905 43.4272L50.8091 19.3305C52.7815 19.2222 54.6379 18.3639 55.998 16.9314C57.3582 15.4988 58.1191 13.6005 58.1251 11.6251ZM50.3751 7.75007C51.1415 7.75007 51.8907 7.97734 52.5279 8.40313C53.1652 8.82892 53.6618 9.43411 53.9551 10.1422C54.2484 10.8502 54.3251 11.6294 54.1756 12.3811C54.0261 13.1327 53.657 13.8232 53.1151 14.3651C52.5732 14.907 51.8827 15.2761 51.1311 15.4256C50.3794 15.5751 49.6002 15.4984 48.8922 15.2051C48.1841 14.9118 47.5789 14.4151 47.1531 13.7779C46.7273 13.1407 46.5001 12.3915 46.5001 11.6251C46.5001 10.5974 46.9083 9.61174 47.635 8.88504C48.3617 8.15833 49.3474 7.75007 50.3751 7.75007ZM7.75008 19.3751C7.75008 18.6087 7.97735 17.8595 8.40314 17.2222C8.82893 16.585 9.43412 16.0883 10.1422 15.795C10.8502 15.5018 11.6294 15.425 12.3811 15.5745C13.1327 15.724 13.8232 16.0931 14.3651 16.635C14.9071 17.177 15.2761 17.8674 15.4256 18.6191C15.5751 19.3708 15.4984 20.1499 15.2051 20.858C14.9118 21.566 14.4152 22.1712 13.7779 22.597C13.1407 23.0228 12.3915 23.2501 11.6251 23.2501C10.5974 23.2501 9.61175 22.8418 8.88504 22.1151C8.15834 21.3884 7.75008 20.4028 7.75008 19.3751ZM11.6251 54.2501C10.8587 54.2501 10.1095 54.0228 9.47225 53.597C8.83501 53.1712 8.33834 52.566 8.04505 51.858C7.75176 51.1499 7.67502 50.3708 7.82454 49.6191C7.97406 48.8674 8.34312 48.177 8.88504 47.635C9.42697 47.0931 10.1174 46.724 10.8691 46.5745C11.6208 46.425 12.3999 46.5018 13.108 46.795C13.816 47.0883 14.4212 47.585 14.847 48.2222C15.2728 48.8595 15.5001 49.6087 15.5001 50.3751C15.5001 51.4028 15.0918 52.3884 14.3651 53.1151C13.6384 53.8418 12.6528 54.2501 11.6251 54.2501ZM35.1502 48.4376H19.1C18.7518 47.106 18.0553 45.8912 17.0821 44.918C16.1089 43.9448 14.8941 43.2484 13.5626 42.9002V26.8499C15.1452 26.4374 16.5561 25.5335 17.5926 24.2683C18.629 23.0032 19.2375 21.4419 19.3305 19.8091L43.4272 14.9905C44.1859 16.553 45.4476 17.8153 47.0096 18.5749L42.1911 42.6696C40.5582 42.7627 38.997 43.3711 37.7318 44.4076C36.4666 45.444 35.5628 46.855 35.1502 48.4376ZM42.6251 54.2501C41.8587 54.2501 41.1095 54.0228 40.4722 53.597C39.835 53.1712 39.3383 52.566 39.045 51.858C38.7518 51.1499 38.675 50.3708 38.8245 49.6191C38.9741 48.8674 39.3431 48.177 39.885 47.635C40.427 47.0931 41.1174 46.724 41.8691 46.5745C42.6208 46.425 43.3999 46.5018 44.108 46.795C44.816 47.0883 45.4212 47.585 45.847 48.2222C46.2728 48.8595 46.5001 49.6087 46.5001 50.3751C46.5001 51.4028 46.0918 52.3884 45.3651 53.1151C44.6384 53.8418 43.6528 54.2501 42.6251 54.2501Z"
															fill="#626874"
														/>
													</svg>
												) : (
													<svg
														className="w-12 h-12 object-cover"
														width="62"
														height="62"
														viewBox="0 0 62 62"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g clipPath="url(#clip0_43_515)">
															<path
																d="M36.177 26.4646C35.9314 26.4629 35.6951 26.5585 35.5197 26.7304C35.3443 26.9023 35.2441 27.1366 35.2408 27.3822V34.2394C35.2441 34.4855 35.3448 34.7203 35.5208 34.8923C35.6969 34.9643 35.934 35.1595 36.1801 35.157H56.8354C57.0815 35.1595 57.3186 35.0643 57.4947 34.8923C57.6707 34.7203 57.7714 34.4855 57.7747 34.2394V27.3822C57.7714 27.1361 57.6707 26.9013 57.4947 26.7293C57.3186 26.5573 57.0815 26.4621 56.8354 26.4646H36.177ZM48.8436 4.653C51.7018 4.7894 53.7571 5.3536 55.0591 6.5502C56.3456 7.7344 57.0059 9.4487 57.1361 11.7179V18.2186C57.1296 18.7722 56.9036 19.3006 56.5077 19.6877C56.1119 20.0748 55.5786 20.289 55.025 20.2832C54.7506 20.2865 54.4783 20.2357 54.2235 20.1337C53.9688 20.0317 53.7366 19.8805 53.5403 19.6888C53.3439 19.4971 53.1873 19.2686 53.0793 19.0163C52.9713 18.7641 52.914 18.493 52.9108 18.2186L52.9139 11.8357C52.8457 10.6577 52.5636 9.9261 52.1606 9.5541C51.77 9.1945 50.5796 8.8721 48.7413 8.7791H8.2057C6.541 8.8411 5.4591 9.1573 4.9352 9.6068C4.5322 9.9509 4.2284 10.8995 4.2253 12.5394L4.216 49.0264C4.371 50.6198 4.7213 51.6831 5.1708 52.2132C5.5118 52.6162 6.5689 53.0192 8.1251 53.2176H48.7847C50.6881 53.2548 51.8103 52.9696 52.1885 52.5883C52.607 52.1636 52.9108 51.0476 52.9108 49.2217V42.8822C52.9108 41.7445 53.8563 40.8176 55.025 40.8176C56.1906 40.8176 57.1361 41.7445 57.1361 42.8822V49.2217C57.1361 52.0117 56.5657 54.098 55.2296 55.4527C53.8532 56.8477 51.6646 57.4057 48.7413 57.3437L7.874 57.3344C5.0933 57.012 3.1 56.2494 1.9127 54.8451C0.837 53.5741 0.2387 51.7606 0 49.2248V12.5363C0.0062 9.8207 0.6572 7.7778 2.1514 6.5006C3.5216 5.3226 5.4994 4.7491 8.1251 4.6499L48.8436 4.653ZM56.8354 22.3354C59.6874 22.3354 62 24.5953 62 27.3822V34.2394C62 37.0263 59.6874 39.2862 56.8354 39.2862H36.1801C33.3281 39.2862 31.0155 37.0232 31.0155 34.2394V27.3822C31.0155 24.5953 33.3281 22.3354 36.1801 22.3354H56.8354ZM41.3447 28.3494C39.9187 28.3494 38.7624 29.4654 38.7624 30.8387C38.7624 32.212 39.9187 33.328 41.3447 33.328C42.7707 33.328 43.927 32.212 43.927 30.8387C43.927 29.4654 42.7707 28.3463 41.3447 28.3463"
																fill="#626874"
															/>
														</g>
														<defs>
															<clipPath id="clip0_43_515">
																<rect width="62" height="62" fill="white" />
															</clipPath>
														</defs>
													</svg>
												)}
											</span>
											<p className="text-sm font-medium text-gray-800 leading-snug">
												{label}
											</p>
										</div>
									</div>
								))}
					</div>
				</div>
			</section>

			{/* ── Layanan Kami ── */}
			<section className="bg-white py-16 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="grid lg:grid-cols-2 gap-8 mb-12">
						<div>
							<p className="text-xs font-semibold tracking-widest text-[#518100] uppercase mb-3">
								Layanan Kami
							</p>
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
								Solusi Rumput Sintetis untuk Berbagai Kebutuhan
							</h2>
						</div>
						<p className="text-sm text-gray-500 leading-relaxed lg:pt-10">
							Kami melayani pemasangan rumput sintetis untuk taman rumah,
							dekorasi, hingga area komersial dengan hasil yang rapi dan modern.
						</p>
					</div>

					{/* Service cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
						{layananList.length > 0
							? layananList.map((layanan) => (
									<div
										key={layanan.namaLayanan}
										className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
									>
										<img
											src={layanan.image || "/layanan-taman.png"}
											alt={layanan.namaLayanan}
											className="w-full h-44 object-cover"
										/>
										<div className="p-4">
											<p className="text-sm font-semibold text-gray-900">
												{layanan.namaLayanan}
											</p>
										</div>
									</div>
								))
							: [
									{
										src: "/layanan-taman.png",
										label: "Taman rumah",
									},
									{
										src: "/layanan-dekorasi.png",
										label: "Dekorasi indoor & outdoor",
									},
									{
										src: "/layanan-komersial.png",
										label: "Area komersial (cafe, kantor, dll)",
									},
									{
										src: "/layanan-vertical.png",
										label: "Vertical garden",
									},
								].map(({ src, label }) => (
									<div
										key={label}
										className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
									>
										<img
											src={src}
											alt={label}
											className="w-full h-44 object-cover"
										/>
										<div className="p-4">
											<p className="text-sm font-semibold text-gray-900">
												{label}
											</p>
										</div>
									</div>
								))}
					</div>

					{/* CTA */}
					<div className="flex justify-center">
						<a
							id="layanan-konsultasi"
							href={SITE_CONFIG.whatsappUrl}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 rounded-full bg-[#518100] px-7 py-3 font-semibold text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
						>
							Konsultasi Gratis Sekarang
							<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-3.5 h-3.5"
								>
									<path
										fillRule="evenodd"
										d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
						</a>
					</div>
				</div>
			</section>

			{/* ── Mulai Sekarang ── */}
			<section className="bg-white px-6 sm:px-10 lg:px-20 py-10">
				<div className="max-w-6xl mx-auto bg-[#1A2210] rounded-3xl px-8 py-20 flex flex-col items-center text-center gap-6">
					<p className="text-xs font-semibold tracking-widest text-[#8DB748] uppercase">
						Mulai Sekarang
					</p>
					<h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight max-w-lg">
						Tertarik? Mari Diskusikan Proyek Anda
					</h2>
					<p className="text-sm text-white/90 max-w-lg">
						Survey gratis, konsultasi gratis, harga transparan tanpa komitmen
						awal.
					</p>
					<div className="flex justify-center">
						<a
							id="testimoni-gabung"
							href={SITE_CONFIG.whatsappUrl}
							target="_blank"
							rel="noreferrer"
							className="flex w-full sm:w-auto justify-center text-sm lg:text-base items-center gap-2 rounded-full bg-white px-7 py-3 text-gray-900 hover:bg-white/90 active:scale-95 transition-all"
						>
							Gabung dengan ratusan klien
							<span className="flex items-center justify-center p-0.5 rounded-full bg-[#518100] text-white">
								<ArrowRight className="w-4 h-4" />
							</span>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
