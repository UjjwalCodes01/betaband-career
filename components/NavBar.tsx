"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Careers" },
  { href: "/verify", label: "Verify Certificate" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F8F7] border-b border-[#E8EAED]">
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="BeatBand Logo" width={140} height={32} className="h-8 w-auto object-contain" />
          <span className="text-[#9DA3AC] font-normal hidden sm:inline text-sm">Careers</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="btn-ghost text-[13px]">
              {l.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-[#E8EAED] mx-2" />
          <a href="/admin" className="btn text-[13px] py-2 px-4">
            Admin
          </a>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden p-1.5 rounded-lg text-[#5C6F8C] hover:bg-[#F0F1F3] transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[#E8EAED] bg-[#F8F8F7] px-5 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded-lg text-[#232327] text-sm hover:bg-[#F0F1F3] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <a href="/admin" className="btn text-sm w-full justify-center">
              Admin
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
