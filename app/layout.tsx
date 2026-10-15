import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Responsible AI Toolkit",
  description: "Built for KARA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-gray-900 text-white p-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              Responsible AI Toolkit
            </Link>

            <Link href="/" className="hover:text-blue-300">
              Home
            </Link>

             <Link href="/curriculum" className="hover:text-blue-300">
              Curriculum
            </Link>
          </div>
        </nav>
        {children}
        
      </body>
    </html>
  );
}
