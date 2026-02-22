import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="fixed top-0 inset-x-0 z-50 flex h-20 items-center justify-between px-6 bg-transparent transition-all duration-300">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <Link href="/">
                    <img src="/logo.png" alt="XFACTORZ Logo" className="h-10 w-auto" />
                </Link>
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex items-center gap-8">
                {[
                    { name: "Solutions", href: "/#solutions" },
                    { name: "Products", href: "/#products" },
                    { name: "Our Story", href: "/#our-story" },
                    { name: "Insight Hub", href: "/#insight-hub" },
                ].map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div className="flex items-center">
                <Button className="bg-[#8739f3] text-white hover:bg-[#722ada] rounded-full px-6 py-2 text-sm font-medium shadow-[0_0_20px_-5px_rgba(135,57,243,0.5)] transition-all hover:scale-105 active:scale-95">
                    Get a demo
                </Button>
            </div>
        </nav>
    );
}
