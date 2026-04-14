import { createFileRoute, Link } from "@tanstack/react-router";

import { createPageMeta, SITE_CONFIG } from "@/lib/seo";
import {
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	CloudCheck,
	Gem,
	Star,
	Users,
} from "lucide-react";
import { useState } from "react";
import { getKategori } from "@/functions/get-kategori";
import { getPortfolio } from "@/functions/get-portfolio";
import { getTestimoni } from "@/functions/get-testimoni";

export const Route = createFileRoute("/_public/")({
	head: () =>
		createPageMeta({
			title: "Jasa Rumput Sintetis & Lapangan Olahraga Pekanbaru",
			description:
				"Adinko menyediakan jasa rumput sintetis dan pembangunan lapangan olahraga profesional di Pekanbaru. Solusi lengkap untuk taman, dekorasi, futsal, minisoccer dengan hasil rapi dan bergaransi.",
			path: "/",
		}),
	loader: async () => {
		const [kategoriResponse, portfolioResponse, testimoniResponse] =
			await Promise.all([getKategori(), getPortfolio(), getTestimoni()]);
		return {
			kategoriList: kategoriResponse.data as Kategori[],
			portfolioList: portfolioResponse.data as Portfolio[],
			testimoniList: testimoniResponse.data as Testimoni[],
		};
	},
	component: IndexComponent,
});

function IndexComponent() {
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
							href={SITE_CONFIG.whatsappUrl}
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
						{/* Card 1 — Hasil Presisi */}
						<div className="bg-white rounded-2xl p-5 flex flex-col justify-between gap-8">
							<div className="flex items-center justify-between">
								<span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A8922E] text-white">
									<Users className="w-5 h-t" />
								</span>
								<span className="text-xs font-medium text-gray-300">001</span>
							</div>
							<div>
								<h3 className="font-bold text-gray-900 mb-1">Hasil Presisi</h3>
								<p className="text-xs text-gray-500 leading-relaxed">
									Pemasangan rapi ditangani tim ahli untuk hasil maksimal.
								</p>
							</div>
						</div>

						{/* Card 2 — Custom Desain (featured, with image) */}
						<div className="relative bg-gray-900 rounded-2xl overflow-hidden flex flex-col justify-end p-5 min-h-52">
							<img
								src="/card-1.webp"
								alt="Custom desain instalasi"
								className="absolute inset-0 w-full h-full object-cover opacity-70"
							/>
							<div className="relative z-10">
								<h3 className="font-bold text-white mb-1">Custom Desain</h3>
								<p className="text-xs text-white/80 leading-relaxed">
									Personalisasi desain sesuai dengan keinginan dan kebutuhan
									Anda.
								</p>
							</div>
						</div>

						{/* Card 3 — Harga Jujur */}
						<div className="bg-white rounded-2xl p-5 flex flex-col justify-between gap-8">
							<div className="flex items-center justify-between">
								<span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A8922E] text-white">
									<Gem className="w-5 h-5" />
								</span>
							</div>
							<div>
								<h3 className="font-bold text-gray-900 mb-1">Harga Jujur</h3>
								<p className="text-xs text-gray-500 leading-relaxed">
									Transparansi total sejak awal tanpa ada biaya tersembunyi.
								</p>
							</div>
						</div>

						{/* Card 4 — After Sales */}
						<div className="bg-white rounded-2xl p-5 flex flex-col justify-between gap-8">
							<div className="flex items-center justify-between">
								<span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A8922E] text-white">
									<CloudCheck className="w-5 h-5" />
								</span>
								<span className="text-xs font-medium text-gray-300">004</span>
							</div>
							<div>
								<h3 className="font-bold text-gray-900 mb-1">After Sales</h3>
								<p className="text-xs text-gray-500 leading-relaxed">
									Dukungan penuh dan garansi setelah proses pengerjaan selesai.
								</p>
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className="mt-10 flex justify-center">
						<a
							id="keunggulan-konsultasi"
							href={SITE_CONFIG.whatsappUrl}
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
										Jl. Todak No.113 Tangkerang Barat,
										<br />
										Kec Marpoyan Damai, Kota Pekanbaru, Riau
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
							href={SITE_CONFIG.whatsappUrl}
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
					<div className="bg-[#F1F2F6] rounded-3xl p-8 flex flex-col gap-5">
						<h2 className="text-xl font-bold text-gray-900">
							Kirim Pesan Sekarang
						</h2>

						<div className="flex flex-col gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Nama Lengkap
								</label>
								<input
									id="kontak-nama"
									type="text"
									placeholder="Nama Anda"
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									No. WhatsApp
								</label>
								<input
									id="kontak-wa"
									type="tel"
									placeholder="0822-xxxx-xxxx"
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Lokasi Proyek
								</label>
								<input
									id="kontak-lokasi"
									type="text"
									placeholder="Kota / Kecamatan"
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Kebutuhan Anda
								</label>
								<div className="relative">
									<select
										id="kontak-kebutuhan"
										defaultValue="Instalasi jaringan"
										className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#518100]/40"
									>
										<option>Instalasi jaringan</option>
										<option>Taman Rumput Sintetis</option>
										<option>Lapangan Futsal</option>
										<option>Lapangan Minisoccer</option>
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
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Keterangan
								</label>
								<textarea
									id="kontak-keterangan"
									rows={4}
									placeholder="Ceritakan detail kebutuhan anda..."
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
					</div>
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

type Kategori = { id: string; nama: string };
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
	createdAt: Date;
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
		{ id: null, nama: "Semua" },
		...kategoriList.map((k) => ({ id: k.id, nama: k.nama })),
	];

	return (
		<>
			{/* Filter tabs */}
			<div className="flex flex-wrap justify-center gap-2 mb-10">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id ?? "all"}
						onClick={() => {
							setActiveKategoriId(tab.id);
							setDisplayLimit(6);
						}}
						className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeKategoriId === tab.id
								? "bg-gray-900 text-white"
								: "border border-gray-300 text-gray-600 hover:bg-gray-100"
							}`}
					>
						{tab.nama}
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
			{/* Header row */}
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
						<span>Based on {testimoniList.length} reviews</span>
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

			{/* Review cards */}
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
											<span className="flex gap-0.5 text-yellow-400">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star key={i} size={11} fill="currentColor" />
												))}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Carousel navigation */}
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

			{/* CTA */}
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
		</>
	);
}
