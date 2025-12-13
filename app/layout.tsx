import "./globals.css";
import LoaderWrapper from "../components/Loaders/LoaderWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
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
          <LoaderWrapper >
            <div className='fixed w-full top-0 left-0 z-30'>
              <Navbar />
            </div>
            <main className="mx-auto pt-16 min-h-screen">
              <Toaster position="top-center"
                toastOptions={{
                  style: { zIndex: 9999 },
                }}
              />
              {children}
            </main>
            <Footer />
          </LoaderWrapper>
        </body>
      </Providers>
    </html>
  );
}
