import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (nice for social sharing)
export const metadata = {
  title: "Smaranda & Iliuta",
  description: "Sunteți invitați la nunta noastră!",
  openGraph: {
    title: "Smaranda & Iliuta",
    description: "Sunteți invitați la nunta noastră!",
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
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
