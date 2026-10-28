"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const links = [
    { label: "Services", href: "/#services", hash: "#services" },
    { label: "Work", href: "/#projects", hash: "#projects" },
    { label: "About", href: "/#about", hash: "#about" },
    { label: "Experience", href: "/#experience", hash: "#experience" },
  ];

  useEffect(() => {
    const updateFromHash = () => setActive(window.location.hash || "#home");
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#173F35] text-white">
      <nav aria-label="Primary navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="leading-tight text-white" aria-label="Junaid UL Hassan home">
          <span className="block text-lg font-bold">Junaid UL Hassan</span>
          <span className="mt-0.5 hidden text-xs text-[#D9E4D9] sm:block">Web Developer & Digital Solutions Specialist</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.hash)}
              aria-current={active === link.hash ? "page" : undefined}
              className={`border-b py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#C58B55] ${active === link.hash ? "border-[#D9E4D9] text-[#D9E4D9]" : "border-transparent text-white hover:text-[#D9E4D9]"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/#contact" className="hidden rounded-md bg-[#F7F5EF] px-5 py-3 text-sm font-semibold text-[#173F35] transition-colors hover:bg-[#D9E4D9] hover:text-[#102E27] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#C58B55] active:bg-[#C9D7C7] sm:inline-flex">
            Discuss Your Project
          </Link>
          <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-md border border-white/50 text-white transition-colors hover:border-[#D9E4D9] hover:bg-white/10 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#C58B55] active:bg-white/15 lg:hidden">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/15 bg-[#173F35] px-4 py-4 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => { setActive(link.hash); setOpen(false); }} aria-current={active === link.hash ? "page" : undefined} className={`block rounded-md px-3 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#C58B55] ${active === link.hash ? "bg-white/10 text-[#D9E4D9]" : "text-white hover:bg-white/10 hover:text-[#D9E4D9]"}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)} className="mt-3 block rounded-md bg-[#F7F5EF] px-5 py-3 text-center text-sm font-semibold text-[#173F35] transition-colors hover:bg-[#D9E4D9] hover:text-[#102E27] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#C58B55] sm:hidden">
              Discuss Your Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
