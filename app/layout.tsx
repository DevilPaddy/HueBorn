import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HueBorn — Curated Men's Fashion",
    template: "%s | HueBorn",
  },
  description:
    "HueBorn curates the best men's fashion — linen shirts, polos, shoes, and trousers from trusted brands.",
  openGraph: {
    siteName: "HueBorn",
    type: "website",
    locale: "en_IN",
    url: "https://hueborn.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@HueBornOfficial",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className='fixed w-full top-0 left-0 z-50'>
            <Navbar />
          </div>
          <main className="mx-auto pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
