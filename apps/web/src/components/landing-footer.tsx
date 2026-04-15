import { useKontak } from "@/hooks/use-kontak";

const perusahaanLinks = [
	{ label: "Tentang Kami", href: "/adinko" },
	{ label: "Portofolio", href: "/portofolio" },
	{ label: "Testimoni", href: "/testimoni" },
	{ label: "Kontak", href: "/kontak" },
];

const adinkoLinks = [
	{ label: "Rumput Sintetis", href: "/adinko" },
	{ label: "Vertical Garden", href: "/adinko" },
	{ label: "Taman Custom", href: "/adinko" },
	{ label: "Bean Bag", href: "/adinko" },
];

const ghaziLinks = [
	{ label: "Lapangan Futsal", href: "/ghazi-sports-hub" },
	{ label: "Minisoccer", href: "/ghazi-sports-hub" },
	{ label: "Padel & Tenis", href: "/ghazi-sports-hub" },
	{ label: "Jogging Track", href: "/ghazi-sports-hub" },
];

export default function LandingFooter() {
	const { instagram, email } = useKontak();
	return (
		<footer
			style={{ fontFamily: "'Montserrat', sans-serif" }}
			className="bg-[#1A2210] text-white rounded-t-3xl"
		>
			{/* ── Main row ── */}
			<div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12">
				{/* Left — brand */}
				<div className="flex flex-col gap-5 max-w-xs lg:max-w-xs">
					{/* Logos */}
					<div className="flex items-center gap-4">
						<img
							src="/logo.webp"
							alt="Adinko logo"
							className="w-14 h-14 object-contain"
						/>
						<img
							src="/logo-ghazi.webp"
							alt="Adinko logo"
							className="w-14 h-14 object-contain"
						/>
					</div>

					{/* Brand name + tagline */}
					<div>
						<p className="font-bold text-base">Adinko × GhaziSportsHub</p>
						<p className="mt-2 text-sm text-white/60 leading-relaxed">
							Penyedia solusi rumput sintetis dan fasilitas olahraga profesional
							terbaik di Pekanbaru & Riau.
						</p>
						<p className="mt-3 text-sm text-white/50">
							Dipercaya oleh 1000+ klien.
						</p>
					</div>

					{/* Social icons */}
					<div className="flex items-center gap-4">
						{/* Instagram */}
						<a
							id="footer-instagram"
							href={
								instagram
									? `https://instagram.com/${instagram.replace("@", "")}`
									: "#"
							}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="text-white/50 hover:text-white transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
							</svg>
						</a>
						{/* Email */}
						<a
							id="footer-email"
							href={email ? `mailto:${email}` : "#"}
							aria-label="Email"
							className="text-white/50 hover:text-white transition-colors"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
						</a>
					</div>
				</div>

				{/* Right — nav columns */}
				<div className="grid sm:grid-cols-3 gap-8 lg:gap-10">
					{/* Perusahaan */}
					<div>
						<p className="text-sm font-bold mb-5 tracking-wide">PERUSAHAAN</p>
						<ul className="flex flex-col gap-3">
							{perusahaanLinks.map((l) => (
								<li key={l.label}>
									<a
										href={l.href}
										className="text-sm text-white/60 hover:text-white transition-colors"
									>
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Adinko */}
					<div>
						<p className="text-sm font-bold mb-5 tracking-wide">ADINKO</p>
						<ul className="flex flex-col gap-3">
							{adinkoLinks.map((l) => (
								<li key={l.label}>
									<a
										href={l.href}
										className="text-sm text-white/60 hover:text-white transition-colors"
									>
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* GhaziSportsHub */}
					<div>
						<p className="text-sm font-bold mb-5 tracking-wide">
							GhaziSportsHub
						</p>
						<ul className="flex flex-col gap-3">
							{ghaziLinks.map((l) => (
								<li key={l.label}>
									<a
										href={l.href}
										className="text-sm text-white/60 hover:text-white transition-colors"
									>
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* ── Bottom bar ── */}
			<div className="border-t border-white/10">
				<div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-5 flex justify-center">
					<p className="text-xs text-white/40 text-center">
						© 2026 Metro Software Indonesia. All rights reserved. Padang,
						Indonesia
					</p>
				</div>
			</div>
		</footer>
	);
}
