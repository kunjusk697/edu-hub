import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eduin Student",
  description: "Learning can be fun"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="stage">
          <div className="phone">
            <div className="phone-inner">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
