import type { Metadata } from "next";

import { AdminShell } from "../components/AdminShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eduin Global Admin",
  description: "Eduin Global Skill Club",
  icons: {
    icon: "/icon.svg",
    apple: "/logo.jpg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
