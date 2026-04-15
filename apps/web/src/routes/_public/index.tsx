import { createFileRoute, Link } from "@tanstack/react-router";

import { createPageMeta, SITE_CONFIG } from "@/lib/seo";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { getKategori } from "@/functions/get-kategori";
import { getPortfolio } from "@/functions/get-portfolio";
import { getGoogleReviews } from "@/functions/get-google-reviews";
import { getLayanan } from "@/functions/get-layanan";
import { useKontak } from "@/hooks/use-kontak";

export const Route = createFileRoute("/_public/")({
	head: () =>
		createPageMeta({
			title: "Jasa Rumput Sintetis & Lapangan Olahraga Pekanbaru",
			description:
				"Adinko menyediakan jasa rumput sintetis dan pembangunan lapangan olahraga profesional di Pekanbaru. Solusi lengkap untuk taman, dekorasi, futsal, minisoccer dengan hasil rapi dan bergaransi.",
			path: "/",
		}),
	loader: async () => {
		const [
			kategoriResponse,
			portfolioResponse,
			googleReviewsResponse,
			layananResponse,
		] = await Promise.all([
			getKategori(),
			getPortfolio(),
			getGoogleReviews(),
			getLayanan(),
		]);
		return {
			kategoriList: kategoriResponse.data as Kategori[],
			portfolioList: portfolioResponse.data as Portfolio[],
			testimoniList: googleReviewsResponse.data as Testimoni[],
			layananList: layananResponse.data as { id: string; title: string }[],
		};
	},
	component: IndexComponent,
});

function IndexComponent() {
	const { whatsappUrl, alamat } = useKontak();
	const { layananList } = Route.useLoaderData();
	const [activeCard, setActiveCard] = useState<number | null>(null);

	const [nama, setNama] = useState("");
	const [wa, setWa] = useState("");
	const [lokasi, setLokasi] = useState("");
	const [kebutuhan, setKebutuhan] = useState("");
	const [keterangan, setKeterangan] = useState("");
	const [errors, setErrors] = useState<{ nama?: string; wa?: string }>({});

	const validate = () => {
		const newErrors: { nama?: string; wa?: string } = {};
		if (!nama.trim()) newErrors.nama = "Nama wajib diisi";
		if (!wa.trim()) newErrors.wa = "WhatsApp wajib diisi";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		const message = `Saya ingin berkonsultasi tentang:

*Nama:* ${nama}
*WhatsApp:* ${wa}
*Lokasi Proyek:* ${lokasi}
*Kebutuhan:* ${kebutuhan}
*Keterangan:* ${keterangan}`.trim();

		const encodedMessage = encodeURIComponent(message);
		window.open(`${whatsappUrl}?text=${encodedMessage}`, "_blank");
	};

	const keunggulanCards = [
		{
			id: 1,
			title: "Hasil Presisi",
			description: "Pemasangan rapi ditangani tim ahli untuk hasil maksimal.",
			image: "card-1.webp",
		},
		{
			id: 2,
			title: "Custom Desain",
			description:
				"Personalisasi desain sesuai dengan keinginan dan kebutuhan Anda.",
			image: "card-2.webp",
		},
		{
			id: 3,
			title: "Harga Jujur",
			description: "Transparansi total sejak awal tanpa ada biaya tersembunyi.",
			image: "card-3.webp",
		},
		{
			id: 4,
			title: "After Sales",
			description:
				"Dukungan penuh dan garansi setelah proses pengerjaan selesai.",
			image: "card-4.webp",
		},
	];

	const renderIcon = (id: number) => {
		switch (id) {
			case 1:
				return (
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10 2.5025C9.67202 2.5025 9.34726 2.5671 9.04425 2.69261C8.74124 2.81812 8.46592 3.00209 8.234 3.234C8.00209 3.46592 7.81812 3.74124 7.69261 4.04425C7.5671 4.34726 7.5025 4.67203 7.5025 5C7.5025 5.32798 7.5671 5.65274 7.69261 5.95575C7.81812 6.25876 8.00209 6.53409 8.234 6.766C8.46592 6.99792 8.74124 7.18188 9.04425 7.30739C9.34726 7.4329 9.67202 7.4975 10 7.4975C10.6624 7.4975 11.2976 7.23437 11.766 6.766C12.2344 6.29763 12.4975 5.66238 12.4975 5C12.4975 4.33762 12.2344 3.70238 11.766 3.234C11.2976 2.76563 10.6624 2.5025 10 2.5025ZM15.625 3.75C15.1277 3.75 14.6508 3.94755 14.2992 4.29918C13.9475 4.65081 13.75 5.12772 13.75 5.625C13.75 6.12228 13.9475 6.5992 14.2992 6.95083C14.6508 7.30246 15.1277 7.5 15.625 7.5C16.1223 7.5 16.5992 7.30246 16.9508 6.95083C17.3025 6.5992 17.5 6.12228 17.5 5.625C17.5 5.12772 17.3025 4.65081 16.9508 4.29918C16.5992 3.94755 16.1223 3.75 15.625 3.75ZM4.375 3.75C3.87772 3.75 3.40081 3.94755 3.04918 4.29918C2.69754 4.65081 2.5 5.12772 2.5 5.625C2.5 6.12228 2.69754 6.5992 3.04918 6.95083C3.40081 7.30246 3.87772 7.5 4.375 7.5C4.87228 7.5 5.3492 7.30246 5.70083 6.95083C6.05246 6.5992 6.25 6.12228 6.25 5.625C6.25 5.12772 6.05246 4.65081 5.70083 4.29918C5.3492 3.94755 4.87228 3.75 4.375 3.75ZM6.25 9.99125C6.25231 9.66125 6.38503 9.34555 6.6192 9.11302C6.85337 8.88049 7.16999 8.74999 7.5 8.75H12.5C12.8315 8.75 13.1495 8.8817 13.3839 9.11612C13.6183 9.35054 13.75 9.66848 13.75 10V13.75C13.7503 14.1434 13.6887 14.5345 13.5675 14.9088C13.2907 15.7571 12.7206 16.479 11.9594 16.9449C11.1982 17.4107 10.2959 17.5899 9.41454 17.4503C8.53313 17.3108 7.73035 16.8615 7.15035 16.1833C6.57035 15.5051 6.25113 14.6424 6.25 13.75V9.99125ZM5 10C5 9.54375 5.12125 9.1175 5.335 8.75H2.5C2.16848 8.75 1.85054 8.8817 1.61612 9.11612C1.3817 9.35054 1.25 9.66848 1.25 10V13.125C1.24983 13.6366 1.37528 14.1405 1.61534 14.5923C1.8554 15.0441 2.20272 15.4301 2.6268 15.7163C3.05088 16.0025 3.53876 16.1802 4.04757 16.2338C4.55639 16.2874 5.07058 16.2153 5.545 16.0238C5.18599 15.3192 4.99921 14.5395 5 13.7488V10ZM15 10V13.75C15 14.5688 14.8038 15.3413 14.455 16.0238C14.9294 16.2153 15.4436 16.2874 15.9524 16.2338C16.4612 16.1802 16.9491 16.0025 17.3732 15.7163C17.7973 15.4301 18.1446 15.0441 18.3847 14.5923C18.6247 14.1405 18.7502 13.6366 18.75 13.125V10C18.75 9.66848 18.6183 9.35054 18.3839 9.11612C18.1495 8.8817 17.8315 8.75 17.5 8.75H14.665C14.8775 9.1175 15 9.54375 15 10Z"
							fill="#FEFFFF"
						/>
					</svg>
				);
			case 2:
				return (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM16 13H18V16H21V18H18V21H16V18H13V16H16V13Z"
							fill="#FEFFFF"
						/>
					</svg>
				);
			case 3:
				return (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.2 8.25L11.85 3H12.15L14.8 8.25H9.2ZM11.25 20.1L2.625 9.75H11.25V20.1ZM12.75 20.1V9.75H21.375L12.75 20.1ZM16.45 8.25L13.85 3H19L21.625 8.25H16.45ZM2.375 8.25L5 3H10.15L7.55 8.25H2.375Z"
							fill="#FEFFFF"
						/>
					</svg>
				);
			case 4:
				return (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2.40002C15.3804 2.40002 17.298 4.70762 17.5764 7.49522H17.6604C19.8384 7.49522 21.6 9.30962 21.6 11.5476C21.6 11.662 21.5956 11.7752 21.5868 11.8872C20.7254 10.8112 19.5614 10.0178 18.2449 9.60937C16.9284 9.20093 15.5197 9.19616 14.2005 9.59566C12.8813 9.99516 11.7119 10.7806 10.8432 11.8508C9.97447 12.921 9.44618 14.2268 9.32642 15.6H6.33842C4.16282 15.6 2.40002 13.7856 2.40002 11.5476C2.40002 9.30962 4.16402 7.49522 6.33842 7.49522H6.42362C6.70442 4.68962 8.61962 2.40002 12 2.40002ZM21.6 16.2C21.6 17.6322 21.0311 19.0057 20.0184 20.0184C19.0057 21.0311 17.6322 21.6 16.2 21.6C14.7679 21.6 13.3943 21.0311 12.3816 20.0184C11.369 19.0057 10.8 17.6322 10.8 16.2C10.8 14.7679 11.369 13.3943 12.3816 12.3816C13.3943 11.369 14.7679 10.8 16.2 10.8C17.6322 10.8 19.0057 11.369 20.0184 12.3816C21.0311 13.3943 21.6 14.7679 21.6 16.2ZM19.0248 13.9752C18.9691 13.9193 18.9029 13.875 18.83 13.8448C18.7571 13.8145 18.6789 13.799 18.6 13.799C18.5211 13.799 18.443 13.8145 18.3701 13.8448C18.2972 13.875 18.231 13.9193 18.1752 13.9752L15 17.1516L14.2248 16.3752C14.169 16.3194 14.1028 16.2752 14.0299 16.245C13.957 16.2148 13.8789 16.1993 13.8 16.1993C13.7211 16.1993 13.643 16.2148 13.5701 16.245C13.4972 16.2752 13.431 16.3194 13.3752 16.3752C13.3194 16.431 13.2752 16.4972 13.245 16.5701C13.2148 16.643 13.1993 16.7211 13.1993 16.8C13.1993 16.8789 13.2148 16.957 13.245 17.0299C13.2752 17.1028 13.3194 17.169 13.3752 17.2248L14.5752 18.4248C14.631 18.4807 14.6972 18.525 14.7701 18.5553C14.843 18.5855 14.9211 18.6011 15 18.6011C15.0789 18.6011 15.1571 18.5855 15.23 18.5553C15.3029 18.525 15.3691 18.4807 15.4248 18.4248L19.0248 14.8248C19.0807 14.7691 19.125 14.7029 19.1553 14.63C19.1855 14.5571 19.2011 14.4789 19.2011 14.4C19.2011 14.3211 19.1855 14.243 19.1553 14.1701C19.125 14.0972 19.0807 14.031 19.0248 13.9752Z"
							fill="#FEFFFF"
						/>
					</svg>
				);
			default:
				return null;
		}
	};
	return (
		<main>
			{/* ── Hero ── */}
			<section className="relative min-h-screen overflow-hidden rounded-b-3xl bg-[#F1F2F6]">
				{/* Background image */}
				<img
					src="/hero-main.webp"
					alt="Lapangan rumput sintetis Adinko"
					className="absolute inset-0 w-full h-full object-top object-cover scale-120"
				/>

				<div className="absolute inset-0 bg-linear-to-r from-[#171B11]/90 to-[#171B11]/20" />

				{/* Hero content */}
				<div className="relative z-10 flex flex-col justify-end min-h-screen px-6 sm:px-10 lg:px-20 max-w-5xl pb-16">
					{/* Badge */}
					<span className="mt-32 lg:mt-0 inline-flex items-center self-start rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-1.5 text-xs lg:text-xl font-medium text-[#FBF9EF]">
						Terpercaya Sejak 2018
					</span>

					{/* Headline */}
					<h1 className="mt-5 text-xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
						Jasa Rumput Sintetis &amp; Lapangan Olahraga Profesional Pekanbaru
					</h1>

					{/* Description */}
					<p className="mt-4 text-xs sm:text-base text-white/80 max-w-lg">
						Solusi lengkap untuk taman, dekorasi, hingga lapangan futsal &amp;
						minisoccer dengan hasil rapi, kuat, dan bergaransi.
					</p>

					{/* CTA Buttons */}
					<div className="mt-8 flex flex-wrap gap-3">
						<a
							id="hero-konsultasi"
							href={whatsappUrl}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 rounded-full bg-[#518100] px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-base font-medium text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
						>
							Konsultasi Gratis
							<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
								<ArrowRight size={13} />
							</span>
						</a>

						<Link
							id="hero-portofolio"
							to="/portofolio"
							className="flex items-center gap-2 rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-base font-medium text-[#D5C167] hover:bg-[#D5C167]/20 active:scale-95 transition-all"
						>
							Lihat Portofolio
							<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
								<ArrowRight size={13} />
							</span>
						</Link>
					</div>
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
			{/* ── Trust ── */}
			<section className="bg-[#F1F2F6] py-12 px-6 sm:px-10 lg:px-20">
				<p className="text-center text-xs lg:text-xl tracking-widest text-[#518100] uppercase mb-8">
					Trust
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-gray-300 max-w-5xl mx-auto">
					{[
						{ stat: "1000+", label: "Proyek Selesai" },
						{ stat: "Expert", label: "Tim Profesional" },
						{ stat: "Premium", label: "Material Pilihan" },
						{ stat: "Gratis", label: "Layanan Survey" },
					].map(({ stat, label }) => (
						<div
							key={stat}
							className="flex flex-col px-6 py-4 border-b lg:border-b-0 border-gray-300"
						>
							<span className="text-xl lg:text-3xl font-semibold leading-tight">
								{stat}
							</span>
							<span className="mt-2 text-sm">{label}</span>
						</div>
					))}
				</div>
			</section>

			{/* ── Tentang Kami ── */}
			<section className="bg-white py-20 px-6 sm:px-10 lg:px-24">
				<div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-between">
					{/* Left — text */}
					<div className="flex flex-col justify-between">
						<div className="flex flex-col">
							<p className="text-xs lg:text-xl tracking-widest text-[#518100] uppercase mb-4">
								Tentang Kami
							</p>
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
								Dua Brand, Satu Komitmen: Kualitas Terbaik
							</h2>
						</div>
						<div className="flex flex-col gap-4">
							<p className="text-[#313131]  max-w-lg">
								Adinko adalah penyedia jasa rumput sintetis di Pekanbaru yang
								telah dipercaya oleh berbagai klien, mulai dari rumah pribadi
								hingga proyek komersial. Kini kami berkembang menyediakan solusi
								pembangunan lapangan olahraga melalui unit khusus kami.
							</p>
							<Link
								id="tentang-selengkapnya"
								to="/adinko"
								className=" self-start flex items-center gap-2 rounded-full bg-[#518100] px-6 py-3 text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
							>
								Lihat Selengkapnya
								<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
									<ArrowRight size={13} />
								</span>
							</Link>
						</div>
					</div>

					{/* Right — two image cards */}
					<div className="flex flex-col gap-6">
						{/* Card 1 — Rumput Sintetis */}
						<div className="flex items-end gap-5">
							<img
								src="/tentang-1.webp"
								alt="Taman rumput sintetis"
								className="w-40 lg:w-64 aspect-square rounded-2xl object-cover shrink-0"
							/>
							<div>
								<h3 className="font-bold text-gray-900 text-base">
									Rumput Sintetis
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Untuk taman, dekorasi, dan area komersial.
								</p>
							</div>
						</div>

						{/* Card 2 — Lapangan Olahraga */}
						<div className="flex items-end gap-5">
							<img
								src="/tentang-2.webp"
								alt="Lapangan olahraga"
								className="w-40 lg:w-64 aspect-square rounded-2xl object-cover shrink-0"
							/>
							<div>
								<h3 className="font-bold text-gray-900 text-base">
									Lapangan Olahraga
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Futsal, minisoccer, mini golf, dan lainnya.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* ── Keunggulan ── */}
			<section className="bg-[#F1F2F6] py-20 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto">
					<p className="text-center text-xs lg:text-xl tracking-widest text-[#518100] uppercase mb-3">
						Keunggulan
					</p>
					<h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-12">
						Solusi Tepat untuk
						<br />
						Hunian Anda
					</h2>

					{/* Cards row */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{keunggulanCards.map((card) => {
							const isActive = activeCard === card.id;

							return (
								<button
									key={card.id}
									type="button"
									onClick={() => setActiveCard(isActive ? null : card.id)}
									onMouseEnter={() => setActiveCard(card.id)}
									onMouseLeave={() => setActiveCard(null)}
									className={`relative rounded-2xl overflow-hidden transition-all duration-300 ease-out text-left min-h-52 ${isActive ? "bg-gray-900" : "bg-white"
										}`}
								>
									{/* Background image (fades in) */}
									<div
										className={`absolute inset-0 transition-opacity duration-300 ease-out ${isActive ? "opacity-40" : "opacity-0"
											}`}
									>
										<img
											src={`/${card.image}`}
											alt=""
											className="w-full h-full object-cover"
										/>
									</div>

									{/* Content */}
									<div className="relative z-10 flex flex-col justify-between p-5 min-h-52">
										{/* Top: Icon badge & number */}
										<div className="flex items-center justify-between">
											<span
												className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isActive
													? "bg-[#A8922E]/80 text-white opacity-0"
													: "bg-[#A8922E] text-white"
													}`}
											>
												{renderIcon(card.id)}
											</span>
											<span
												className={`text-xs font-medium transition-opacity duration-300 ${isActive ? "text-white/0" : "text-gray-300"
													}`}
											>
												00{card.id}
											</span>
										</div>

										{/* Bottom: Title & description */}
										<div className="mt-auto">
											<h3
												className={`font-bold mb-1 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-900"
													}`}
											>
												{card.title}
											</h3>
											<p
												className={`text-xs leading-relaxed transition-colors duration-300 ${isActive ? "text-white/80" : "text-gray-500"
													}`}
											>
												{card.description}
											</p>
										</div>
									</div>
								</button>
							);
						})}
					</div>

					{/* CTA */}
					<div className="mt-10 flex justify-center">
						<a
							id="keunggulan-konsultasi"
							href={whatsappUrl}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 rounded-full bg-[#518100] px-7 py-3 text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
						>
							Konsultasi GRATIS Sekarang
							<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
								<ArrowRight size={13} />
							</span>
						</a>
					</div>
				</div>
			</section>

			{/* ── Gallery ── */}
			<section
				id="portofolio"
				className="bg-white py-20 px-6 sm:px-10 lg:px-20"
			>
				<div className="max-w-6xl mx-auto">
					<p className="text-center text-xs lg:text-xl tracking-widest text-[#518100] uppercase mb-3">
						Gallery
					</p>
					<h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
						Hasil Pekerjaan Kami
					</h2>

					<GalleryContent />
				</div>
			</section>

			{/* ── Testimoni ── */}
			<section id="testimoni" className="px-6 sm:px-10 lg:px-20 py-8">
				<div className="max-w-6xl mx-auto bg-[#101A00] rounded-3xl px-8 py-10">
					<TestimoniContent />
				</div>
			</section>

			{/* ── Contact ── */}
			<section id="kontak" className="bg-white py-16 px-6 sm:px-10 lg:px-20">
				<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
					{/* Left — info */}
					<div className="flex flex-col gap-6 border border-[#F1F2F6] rounded-3xl p-8">
						<div>
							<p className="text-sm font-semibold tracking-widest text-[#518100] uppercase mb-2">
								Contact
							</p>
							<h2 className="text-2xl font-bold text-gray-900">Hubungi Kami</h2>
						</div>

						<div className="flex flex-col gap-5">
							{/* Alamat */}
							<div className="flex gap-3">
								<span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#518100] text-white shrink-0 mt-0.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-4 h-4"
									>
										<path
											fillRule="evenodd"
											d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.07-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 0 0-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.144.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
											clipRule="evenodd"
										/>
									</svg>
								</span>
								<div>
									<p className="font-bold text-gray-900 text-sm">Alamat</p>
									<p className="text-sm text-gray-500 mt-0.5">
										{alamat ?? "Alamat tidak tersedia"}
									</p>
								</div>
							</div>

							{/* WhatsApp */}
							<div className="flex gap-3">
								<span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#518100] text-white shrink-0 mt-0.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-4 h-4"
									>
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
										<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.878 9.878 0 0 1-5.031-1.376l-.36-.214-3.733.967.994-3.638-.234-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
									</svg>
								</span>
								<div>
									<p className="font-bold text-gray-900 text-sm">WhatsApp</p>
									<p className="text-sm text-gray-500 mt-0.5">
										0852-6445-6566 (Adinko)
										<br />
										0813 8894-1740
									</p>
									<p className="text-sm text-gray-500 mt-1">
										0852-6445-6566 (GhaziSportsHub)
									</p>
								</div>
							</div>

							{/* Instagram */}
							<div className="flex gap-3">
								<span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#518100] text-white shrink-0 mt-0.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-4 h-4"
									>
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
									</svg>
								</span>
								<div>
									<p className="font-bold text-gray-900 text-sm">Instagram</p>
									<p className="text-sm text-gray-500 mt-0.5">
										@adinko.pekanbaru
										<br />
										@ghazisportshub
									</p>
								</div>
							</div>
						</div>

						{/* Map embed */}
						<div className="rounded-2xl overflow-hidden border border-gray-100 h-44 w-full">
							<iframe
								title="Lokasi Adinko"
								src={SITE_CONFIG.googleMapsUrl}
								width="100%"
								height="100%"
								style={{ border: 0 }}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>

						{/* CTA */}
						<a
							id="kontak-whatsapp"
							href={whatsappUrl}
							target="_blank"
							rel="noreferrer"
							className="self-start flex items-center gap-2 rounded-full bg-[#518100] px-6 py-3 font-semibold text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
						>
							Konsultasi GRATIS Sekarang
							<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
								<ArrowRight size={13} />
							</span>
						</a>
					</div>

					{/* Right — form */}
					<form
						onSubmit={handleSubmit}
						className="bg-[#F1F2F6] rounded-3xl p-8 flex flex-col gap-5"
					>
						<h2 className="text-xl font-bold text-gray-900">
							Kirim Pesan Sekarang
						</h2>

						<div className="flex flex-col gap-4">
							<div>
								<label
									htmlFor="kontak-nama"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Nama Lengkap
								</label>
								<input
									id="kontak-nama"
									type="text"
									placeholder="Nama Anda"
									value={nama}
									onChange={(e) => setNama(e.target.value)}
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
								{errors.nama && (
									<p className="text-red-500 text-xs mt-1">{errors.nama}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="kontak-wa"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									No. WhatsApp
								</label>
								<input
									id="kontak-wa"
									type="tel"
									placeholder="0822-xxxx-xxxx"
									value={wa}
									onChange={(e) => setWa(e.target.value)}
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
								{errors.wa && (
									<p className="text-red-500 text-xs mt-1">{errors.wa}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="kontak-lokasi"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Lokasi Proyek
								</label>
								<input
									id="kontak-lokasi"
									type="text"
									placeholder="Kota / Kecamatan"
									value={lokasi}
									onChange={(e) => setLokasi(e.target.value)}
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
							</div>

							<div>
								<label
									htmlFor="kontak-kebutuhan"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Kebutuhan Anda
								</label>
								<div className="relative">
									<select
										id="kontak-kebutuhan"
										value={kebutuhan}
										onChange={(e) => setKebutuhan(e.target.value)}
										className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
									>
										{layananList.map((layanan) => (
											<option key={layanan.id} value={layanan.title}>
												{layanan.title}
											</option>
										))}
										<option>Lainnya</option>
									</select>
									<span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											className="w-4 h-4"
										>
											<path
												fillRule="evenodd"
												d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</div>
							</div>

							<div>
								<label
									htmlFor="kontak-keterangan"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Keterangan
								</label>
								<textarea
									id="kontak-keterangan"
									rows={4}
									placeholder="Ceritakan detail kebutuhan anda..."
									value={keterangan}
									onChange={(e) => setKeterangan(e.target.value)}
									className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
							</div>

							<div className="flex justify-end">
								<button
									id="kontak-kirim"
									type="submit"
									className="flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 active:scale-95 transition-all"
								>
									Kirim Pesan
									<span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-gray-900">
										<ArrowRight size={13} />
									</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>

			{/* ── Use our service ── */}
			<section className="bg-white py-24 px-6 sm:px-10 lg:px-20">
				<div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
					{/* Label */}
					<p className="text-xs lg:text-sm tracking-widest text-[#518100] uppercase">
						Use Our Services
					</p>

					{/* Headline */}
					<h2 className="text-2xl lg:text-3xl leading-snug">
						<span>Jangan tunda lagi, wujudkan taman atau </span>
						<span className="text-black/50">
							lapangan impian Anda bersama kami sekarang juga.
						</span>
					</h2>
				</div>
			</section>
		</main>
	);
}

type Kategori = { id: string; nama: string; image: string | null };
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
};
type Testimoni = {
	id: string;
	kategoriId: string;
	kategoriNama: string | null;
	nama: string;
	testimoni: string;
	image: string | null;
	timeSpan: string | null;
	createdAt: Date;
	rating: number;
};
function GalleryContent() {
	const { kategoriList, portfolioList } = Route.useLoaderData();
	const [activeKategoriId, setActiveKategoriId] = useState<string | null>(null);
	const [displayLimit, setDisplayLimit] = useState(6);

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
		<>
			{/* Filter tabs */}
			<div className="flex flex-wrap justify-center gap-5 mb-10">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id ?? "all"}
						onClick={() => {
							setActiveKategoriId(tab.id);
							setDisplayLimit(6);
						}}
						className={`hover:scale-120 relative rounded-full overflow-hidden px-4 py-1.5 text-sm font-medium transition-all ${activeKategoriId === tab.id ? "text-white" : "text-gray-900"
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
									className={`absolute inset-0 ${activeKategoriId === tab.id ? "bg-black/70" : "bg-white/60"}`}
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

			{/* Photo grid */}
			{displayedPortfolio && displayedPortfolio.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{displayedPortfolio.map((item) => (
						<div
							key={item.id}
							className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="relative">
								<img
									src={item.image || "/gallery-placeholder.webp"}
									alt={item.title}
									className="w-full h-48 rounded-2xl object-cover"
								/>
								<span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs text-[#518100]">
									{item.kategoriNama || "Lainnya"}
								</span>
							</div>
							<div className="p-4">
								<h3 className="font-semibold text-gray-900 text-sm">
									{item.title}
								</h3>
								<p className="mt-0.5 text-xs text-gray-500">
									{[item.alamat, item.tahun].filter(Boolean).join(" • ") ||
										"Tidak ada lokasi"}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-center text-gray-500 py-12">
					Belum ada portofolio untuk kategori ini.
				</p>
			)}

			{/* Load more */}
			{hasMore && (
				<div className="mt-10 flex justify-center">
					<button
						type="button"
						id="gallery-lihat-lebih"
						onClick={() => setDisplayLimit((prev) => prev + 6)}
						className="flex items-center gap-2 rounded-full bg-[#518100] px-7 py-3 text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
					>
						Lihat lebih banyak proyek
						<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
							<ArrowRight size={13} />
						</span>
					</button>
				</div>
			)}
		</>
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

function TestimoniContent() {
	const { whatsappUrl } = useKontak();
	const { testimoniList } = Route.useLoaderData();
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsPerPage = 3;
	const hasCarousel = testimoniList.length > itemsPerPage;
	const maxIndex = Math.max(0, testimoniList.length - itemsPerPage);

	const displayedTestimonies = testimoniList.slice(
		currentIndex,
		currentIndex + itemsPerPage,
	);

	const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
	const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

	return (
		<>
			<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
				<div>
					<p className="text-xs lg:text-lg tracking-widest text-[#90E500] uppercase mb-2">
						Testimoni Klien
					</p>
					<h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
						Apa Kata Klien Kami?
					</h2>
					<div className="flex items-center gap-2 text-sm text-white">
						<span>5.0</span>
						<span className="flex gap-0.5 text-yellow-400">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star key={i} size={14} fill="currentColor" />
							))}
						</span>
						<span className="text-[#90E500]">•</span>
						<span>Based on 100+ reviews</span>
					</div>
				</div>
				<div className="flex flex-col gap-3 lg:items-end">
					<p className="text-sm text-white max-w-xs lg:text-right">
						Lebih dari 1000 klien telah mempercayakan proyek mereka kepada kami.
					</p>
					<a
						href={SITE_CONFIG.googleMapsUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-white backdrop-blur-sm px-4 py-2 text-sm hover:bg-white/80 transition-all self-start lg:self-auto"
					>
						review us on
						<img
							src="/logo-gmaps.webp"
							alt="Google Maps"
							className="w-3 h-auto"
						/>
					</a>
				</div>
			</div>

			{displayedTestimonies.length > 0 ? (
				<div className="relative mb-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{displayedTestimonies.map((item) => {
							const { initials, color } = getAvatarData(item.nama);
							return (
								<div
									key={item.id}
									className="bg-[#203300] border border-[#304D00] rounded-2xl p-5 flex flex-col justify-between gap-6"
								>
									<p className="text-white text-sm lg:text-base font-medium leading-relaxed">
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
												className="flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-bold shrink-0"
												style={{ backgroundColor: color }}
											>
												{initials}
											</span>
										)}
										<div>
											<p className="text-sm font-semibold text-white">
												{item.nama}
											</p>
											{item.timeSpan && (
												<p className="text-xs text-white/60">{item.timeSpan}</p>
											)}
											<span className="flex gap-0.5 text-yellow-400">
												{Array.from({ length: item.rating }).map((_, i) => (
													<Star key={i} size={11} fill="currentColor" />
												))}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{hasCarousel && (
						<>
							<button
								type="button"
								onClick={prev}
								disabled={currentIndex === 0}
								className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
								aria-label="Previous testimonials"
							>
								<ChevronLeft className="w-5 h-5 text-white" />
							</button>
							<button
								type="button"
								onClick={next}
								disabled={currentIndex >= maxIndex}
								className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
								aria-label="Next testimonials"
							>
								<ChevronRight className="w-5 h-5 text-white" />
							</button>
						</>
					)}
				</div>
			) : (
				<p className="text-center text-white/60 py-12 mb-8">
					Belum ada testimoni.
				</p>
			)}

			<div className="flex justify-center gap-2">
				<a
					id="testimoni-gabung"
					href={whatsappUrl}
					target="_blank"
					rel="noreferrer"
					className="flex w-full sm:w-auto justify-center text-sm lg:text-base items-center gap-2 rounded-full bg-white px-7 py-3 text-gray-900 hover:bg-white/90 active:scale-95 transition-all"
				>
					Gabung dengan ratusan klien
					<span className="flex items-center justify-center p-0.5 rounded-full bg-[#518100] text-white">
						<ArrowRight className="w-4 h-4" />
					</span>
				</a>
				<Link
					id="testimoni-gabung"
					to="/testimoni"
					className="flex w-full sm:w-auto justify-center text-sm lg:text-base items-center gap-2 rounded-full bg-[#518100] text-white px-7 py-3 hover:bg-[#518100]/80 active:scale-95 transition-all"
				>
					Lihat Testimoni
					<span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
						<ArrowRight className="w-4 h-4" />
					</span>
				</Link>
			</div>
		</>
	);
}
