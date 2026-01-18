import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (nice for social sharing)
export const metadata = {
  title: "Smaranda & Iliuta",
  description: "Avem plăcearea de a vă invita la nunta noastră!",
  openGraph: {
    title: "Smaranda & Iliuta",
    description: "Avem plăcearea de a vă invita la nunta noastră!",
    url: "https://wedding.iliutaadrian.com/",
    siteName: "Smaranda & Iliuta",
    images: [
      {
        url: "https://wedding.iliutaadrian.com/images/og-image.png",
        width: 1200,
        height: 600,
        alt: "Smaranda & Iliuta Wedding Website",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <head>
        <Script
          src="https://umami.iliutaadrian.com/script.js"
          data-website-id="e3cd8951-d38d-4af4-81c2-3a88edc69227"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
