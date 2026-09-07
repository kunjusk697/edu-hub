"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/students", label: "Students" },
  { href: "/parents", label: "Parents" },
  { href: "/mentors", label: "Mentors" },
  { href: "/batches", label: "Batches" },
  { href: "/programmes", label: "Programmes" },
  { href: "/courses", label: "Courses" },
  { href: "/payments", label: "Payments" }
];

export function AdminShell({
  children
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  return (
    <>
      <aside className="sidebar">
        <div className="logo">Eduin Global</div>
        <div className="tagline">Education Management Platform</div>
        <nav className="nav">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <div>Admin</div>
          <div>Eduin Global</div>
        </header>
        <div className="content">{children}</div>
      </div>
    </>
  );
}
