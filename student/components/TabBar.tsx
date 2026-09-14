"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="tabbar">
      <Link className={pathname.startsWith("/home") ? "active" : ""} href="/home">
        ▦
      </Link>
      <Link href="/home">📅</Link>
      <Link href="/home">🔖</Link>
      <Link href="/home">🔔</Link>
    </nav>
  );
}
