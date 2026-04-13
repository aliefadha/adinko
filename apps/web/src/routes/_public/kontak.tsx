import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { createPageMeta, SITE_CONFIG } from "@/lib/seo";

export const Route = createFileRoute("/_public/kontak")({
	head: () =>
		createPageMeta({
			title: "Kontak",
			description:
				"Hubungi Adinko untuk konsultasi gratis tentang rumput sintetis dan pembangunan lapangan olahraga. Tim kami siap membantu dari survei awal hingga purna jual. Respons dalam 1 jam.",
			path: "/kontak",
		}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			{/* ── Hero ── */}
			<section className="relative min-h-screen overflow-hidden rounded-b-3xl bg-[#F1F2F6]">
				{/* Background image */}
				<img
					src="/hero-kontak.webp"
					alt="Lapangan rumput sintetis Adinko"
					className="absolute inset-0 w-full h-full object-top object-cover scale-120"
				/>

				<div className="absolute inset-0 bg-linear-to-r from-[#171B11]/90 to-[#171B11]/20" />

				{/* Hero content */}
				<div className="relative z-10 flex flex-col justify-end min-h-screen px-6 sm:px-10 lg:px-20 max-w-5xl pb-16">
					{/* Badge */}
					<span className="mt-32 lg:mt-0 inline-flex items-center self-start rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-1.5 text-xs lg:text-base font-medium text-[#FBF9EF]">
						Respons dalam 1 Jam
					</span>

					{/* Headline */}
					<h1 className="mt-5 text-xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
						Hubungi Kami Kami Siap Membantu!
					</h1>

					{/* Description */}
					<p className="mt-4 text-xs sm:text-base text-white/80 max-w-lg">
						Konsultasikan kebutuhan Anda sekarang juga. Tim kami siap membantu
						dari survei awal, perencanaan, pengerjaan, hingga purna jual.
					</p>

					{/* CTA Buttons */}
					<div className="mt-8 flex flex-wrap gap-3">
						<a
							id="hero-konsultasi"
							href={SITE_CONFIG.whatsappUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-semibold text-white hover:bg-[#25D366]/90 active:scale-95 transition-all text-base"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5 shrink-0"
							>
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
								<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.878 9.878 0 0 1-5.031-1.376l-.36-.214-3.733.967.994-3.638-.234-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
							</svg>
							Konsultasi Gratis via WhatsApp
						</a>
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
		</div>
	);
}
