import { useState } from "react";

import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useKontak } from "@/hooks/use-kontak";

const tentangLinks = [
	{ label: "Adinko", href: "/adinko" },
	{ label: "Ghazisportshub", href: "/ghazi-sports-hub" },
];

const navLinks = [
	{ label: "Layanan", href: "/layanan" },
	{ label: "Portofolio", href: "/portofolio" },
	{ label: "Testimoni", href: "/testimoni" },
	{ label: "Kontak", href: "/kontak" },
];

function Logo() {
	return (
		<Link to="/" className="flex items-center gap-2 shrink-0">
			<img
				src="/logo.webp"
				alt="Adinko logo"
				className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
			/>
		</Link>
	);
}

export default function LandingHeader() {
	const { whatsappUrl } = useKontak();
	const [tentangOpen, setTentangOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [mobileTentangOpen, setMobileTentangOpen] = useState(false);

	const closeMobile = () => {
		setMobileOpen(false);
		setMobileTentangOpen(false);
	};

	return (
		<>
			{/* Montserrat font */}
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
				rel="stylesheet"
			/>

			<header
				style={{ fontFamily: "'Montserrat', sans-serif" }}
				className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl"
			>
				{/* ── Desktop pill ── */}
				<div className="flex items-center justify-between gap-6 rounded-full bg-white px-4  shadow-lg">
					<Logo />

					{/* Desktop nav — hidden on mobile */}
					<nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
						{/* Tentang dropdown */}
						<div className="relative">
							<button
								id="nav-tentang"
								onClick={() => setTentangOpen((v) => !v)}
								onBlur={() => setTimeout(() => setTentangOpen(false), 150)}
								className="flex items-center gap-1 px-4 py-2 rounded-full  font-medium text-gray-700 hover:bg-gray-100 transition-colors"
							>
								Tentang
								<ChevronDown
									size={14}
									className={`transition-transform duration-200 ${tentangOpen ? "rotate-180" : ""}`}
								/>
							</button>

							{tentangOpen && (
								<div className="absolute top-full left-0 mt-2 w-44 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50">
									{tentangLinks.map((link) => (
										<a
											key={link.label}
											href={link.href}
											className="block px-4 py-2.5  font-medium text-gray-700 hover:bg-gray-50 transition-colors"
										>
											{link.label}
										</a>
									))}
								</div>
							)}
						</div>

						{navLinks.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition-colors"
							>
								{item.label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-2">
						{/* CTA button — visible on mobile + desktop */}
						<a
							href={whatsappUrl}
							target="_blank"
							rel="noreferrer"
							id="nav-konsultasi"
							className="flex items-center gap-1.5 shrink-0 rounded-full bg-[#518100] px-3 py-2 text-sm font-semibold text-white hover:bg-[#518100]/80 active:scale-95 transition-all"
						>
							Konsultasi
							<span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E0D28F] text-[#518100]">
								<ArrowRight size={11} />
							</span>
						</a>

						{/* Hamburger button — visible on mobile only */}
						<button
							id="nav-hamburger"
							aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen((v) => !v)}
							className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
						>
							{mobileOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				{/* ── Mobile drawer ── */}
				<div
					className={`lg:hidden mt-2 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
						mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<nav className="flex flex-col py-3 px-2">
						{/* Tentang accordion */}
						<div>
							<button
								id="nav-mobile-tentang"
								onClick={() => setMobileTentangOpen((v) => !v)}
								className="flex items-center justify-between w-full px-4 py-3 rounded-xl  font-medium text-gray-700 hover:bg-gray-50 transition-colors"
							>
								Tentang
								<ChevronDown
									size={14}
									className={`transition-transform duration-200 ${mobileTentangOpen ? "rotate-180" : ""}`}
								/>
							</button>

							<div
								className={`overflow-hidden transition-all duration-200 ${
									mobileTentangOpen ? "max-h-40" : "max-h-0"
								}`}
							>
								{tentangLinks.map((link) => (
									<a
										key={link.label}
										href={link.href}
										onClick={closeMobile}
										className="block pl-8 pr-4 py-2.5  font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
									>
										{link.label}
									</a>
								))}
							</div>
						</div>

						{/* Other links */}
						{navLinks.map((item) => (
							<a
								key={item.label}
								href={item.href}
								onClick={closeMobile}
								className="px-4 py-3 rounded-xl  font-medium text-gray-700 hover:bg-gray-50 transition-colors"
							>
								{item.label}
							</a>
						))}
					</nav>
				</div>
			</header>
		</>
	);
}
