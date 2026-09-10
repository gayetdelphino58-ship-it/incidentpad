"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);
    return [
      "text-sm font-medium transition-colors",
      active ? "text-white" : "text-slate-300 hover:text-white",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-navy-950/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-sm font-bold text-white shadow-sm">
            IP
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            IncidentPad
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/reports" className={linkClass("/reports")}>
            Reports
          </Link>
          <Link
            href="/new"
            className="rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-400"
          >
            New
          </Link>
        </nav>
      </div>
    </header>
  );
}
