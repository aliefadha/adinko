import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_public/adinko')({
  component: RouteComponent,
})

const CAROUSEL_SLIDES = [
  { src: '/tentang-taman.png',    alt: 'Taman rumput sintetis premium' },
  { src: '/gallery-2.png',        alt: 'Pemasangan rumput sintetis' },
  { src: '/layanan-taman.png',    alt: 'Hasil akhir taman sintetis' },
]

function RouteComponent() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
  const next = () => setCurrent((c) => (c + 1) % CAROUSEL_SLIDES.length)
  return (
    <div>
        {/* ── Hero ── */}
			<section className="relative min-h-screen overflow-hidden rounded-b-3xl bg-[#F1F2F6]">
				{/* Background image */}
				<img
					src="/hero-adinko.webp"
					alt="Lapangan rumput sintetis Adinko"
					className="absolute inset-0 w-full h-full object-top object-cover scale-120"
				/>

				<div className="absolute inset-0 bg-linear-to-r from-[#171B11]/90 to-[#171B11]/20" />

				{/* Hero content */}
				<div className="relative z-10 text-center flex flex-col justify-center items-center min-h-screen px-6 sm:px-10 lg:px-20 max-w-5xl mx-auto pb-16">
					{/* Badge */}
					<span className="mt-32 lg:mt-0 inline-flex items-center rounded-full border border-[#D5C167] bg-[#D5C167]/10 backdrop-blur-sm px-4 py-1.5 text-xs lg:text-xl font-medium text-[#FBF9EF]">
						Tentang Adinko
					</span>

					{/* Headline */}
					<h1 className="mt-5 text-xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
						Solusi Rumput Sintetis Berkualitas untuk Berbagai Kebutuhan
					</h1>

					{/* Description */}
					<p className="mt-4 text-xs sm:text-lg text-white/80 ">
					Dari taman rumah hingga area komersial, Adinko menghadirkan rumput sintetis dengan tampilan natural, pemasangan rapi, dan daya tahan tinggi.
					</p>

				</div>

				{/* Floating WhatsApp button */}
				<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
					<span className="rounded-full bg-[#E0D28F] px-3 py-1 text-xs font-semibold text-[#3a5c00] shadow-md">
						Slot terbatas - Pesan sekarang!
					</span>
					<a
						id="hero-whatsapp"
						href="https://wa.me/62"
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
                            Berpengalaman dalam Pemasangan Rumput Sintetis Profesional
                        </h2>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Adinko adalah penyedia jasa rumput sintetis di Pekanbaru yang telah dipercaya oleh berbagai klien. Kami fokus pada kualitas material, kerapian pengerjaan, dan hasil akhir yang estetis serta tahan lama.
                    </p>
                    {/* Service category tabs */}
                    <div className="flex flex-wrap gap-2">
                        {["Rumput Sintetis", "Vertikal & Garden Sintetis"].map((tab, i) => (
                            <button
                                key={tab}
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
                        {CAROUSEL_SLIDES.map((slide, i) => (
                            <img
                                key={slide.src}
                                src={slide.src}
                                alt={slide.alt}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                                    i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Prev */}
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all shadow"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/>
                        </svg>
                    </button>

                    {/* Next */}
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all shadow"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
                        </svg>
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {CAROUSEL_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Slide ${i + 1}`}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    i === current ? 'bg-white w-4' : 'bg-white/50'
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
                        Kami berkomitmen memberikan layanan terbaik lewat kualitas produk, pelayanan profesional, dan kepuasan pelanggan.
                    </p>
                </div>

                {/* Content row */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left — image card with Nilai Kami overlay */}
                    <div className="relative rounded-3xl overflow-hidden">
                        <img
                            src="/nilai-adinko.webp"
                            alt="Nilai Adinko"
                            className="w-full h-full min-h-72 object-cover"
                        />
                        {/* Dark overlay + text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                            <p className="font-bold text-white text-xl mb-3">Nilai Kami</p>
                            <div className="flex flex-wrap gap-2">
                                {["Kualitas", "Kepercayaan", "Profesionalisme"].map((v) => (
                                    <span
                                        key={v}
                                        className="rounded-full border border-white/50 bg-white/10 backdrop-blur-sm px-4 py-1 text-xs font-medium text-white"
                                    >
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Visi + Misi cards */}
                    <div className="flex flex-col gap-4">
                        {/* Visi */}
                        <div className="rounded-2xl bg-[#ECF3E0] p-6">
                            <p className="font-bold text-gray-900 mb-2">Visi Kami</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Menjadi penyedia solusi rumput sintetis dan fasilitas olahraga terbaik di Pekanbaru dan sekitarnya.
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="rounded-2xl bg-[#518100] p-6 flex-1">
                            <p className="font-bold text-white mb-4">Misi Kami</p>
                            <ul className="flex flex-col gap-3">
                                {[
                                    "Memberikan produk berkualitas tinggi dengan material premium terpilih",
                                    "Pelayanan profesional",
                                    "Harga kompetitif",
                                    "Pengerjaan tepat waktu",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-white/90">
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
                    Kami Mengutamakan Kualitas<br className="hidden sm:block" /> di Setiap Detail
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            num: "001",
                            label: "Material rumput sintetis berkualitas premium",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                </svg>
                            ),
                            active: true,
                        },
                        {
                            num: "002",
                            label: "Pemasangan rapi & presisi",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                                </svg>
                            ),
                            active: false,
                        },
                        {
                            num: "003",
                            label: "Bisa custom sesuai kebutuhan desain",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            ),
                            active: false,
                        },
                        {
                            num: "004",
                            label: "Harga transparan tanpa biaya tersembunyi",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7.5l-3-1.5m0 0L15 7.5M18 6v6M3 18l3-1.5m0 0L9 18m-3-1.5V7.5l3-1.5m0 0L12 7.5M6 6v6M3 6l3-1.5L9 6M15 18l3-1.5 3 1.5m-3-1.5V12" />
                                </svg>
                            ),
                            active: false,
                        },
                    ].map(({ num, label, icon, active }) => (
                        <div
                            key={num}
                            className={`rounded-2xl p-5 flex flex-col justify-between gap-8 min-h-44 ${
                                active
                                    ? "border-2 border-[#518100] bg-white"
                                    : "bg-white border border-gray-100"
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <span className={active ? "text-[#518100]" : "text-gray-400"}>
                                    {icon}
                                </span>
                                <span className="text-xs text-gray-300 font-medium">{num}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 leading-snug">{label}</p>
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
                        Kami melayani pemasangan rumput sintetis untuk taman rumah, dekorasi, hingga area komersial dengan hasil yang rapi dan modern.
                    </p>
                </div>

                {/* Service cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { src: "/layanan-taman.png", label: "Taman rumah" },
                        { src: "/layanan-dekorasi.png", label: "Dekorasi indoor & outdoor" },
                        { src: "/layanan-komersial.png", label: "Area komersial (cafe, kantor, dll)" },
                        { src: "/layanan-vertical.png", label: "Vertical garden" },
                    ].map(({ src, label }) => (
                        <div key={label} className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                            <img src={src} alt={label} className="w-full h-44 object-cover" />
                            <div className="p-4">
                                <p className="text-sm font-semibold text-gray-900">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                    <a
                        id="layanan-konsultasi"
                        href="https://wa.me/62"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full bg-[#518100] px-7 py-3 font-semibold text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
                    >
                        Konsultasi GRATIS Sekarang
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E0D28F] text-[#518100]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
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
                    Survey gratis, konsultasi gratis, harga transparan tanpa komitmen awal.
                </p>
                <div className="flex justify-center">
					<a
						id="testimoni-gabung"
						href="https://wa.me/62"
						target="_blank"
						rel="noreferrer"
						className="flex w-full sm:w-auto justify-center text-sm lg:text-base items-center gap-2 rounded-full bg-white px-7 py-3 text-gray-900 hover:bg-white/90 active:scale-95 transition-all"
					>
						Gabung dengan ratusan klien
						<span className="flex items-center justify-center p-0.5 rounded-full bg-[#518100] text-white">
							<ArrowRight className="w-4 h-4"/>
						</span>
					</a>
				</div>
            </div>
        </section>
    </div>
  )
}
