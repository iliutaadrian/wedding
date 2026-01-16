import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (nice for social sharing)
export const metadata = {
  title: "Smaranda & Iliuta",
  description:
    "You are invited to our Wedding | Sei invitato al nostro Matrimonio |  Jesteś zaproszony na nasz Ślub",
  openGraph: {
    title: "Karolina & Emanuele",
    description:
      "You are invited to our Wedding | Sei invitato al nostro Matrimonio |  Jesteś zaproszony na nasz Ślub",
    url: "https://wedding.iliutaadrian.com/",
    siteName: "Karolina & Emanuele",
    images: [
      {
        url: "https://emanuelekarolina.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "Karolina & Emanuele Wedding Website",
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
