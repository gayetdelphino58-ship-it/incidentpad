import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IncidentPad · RoadStar Hackathon 2026",
  description:
    "File a trucking incident in under 2 minutes and share a clear summary.",
  applicationName: "IncidentPad",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:py-8">
            {children}
          </main>
          <footer className="print:hidden border-t border-slate-200 bg-white/70 py-4 text-center text-xs text-slate-500">
            IncidentPad · RoadStar Hackathon 2026 · Client-side demo
          </footer>
        </div>
      </body>
    </html>
  );
}
