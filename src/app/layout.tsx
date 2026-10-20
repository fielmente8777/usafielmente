import Call from "@/components/Call";
import Footer2 from "@/components/Footer/Footer2";
import NavBar from "@/components/Header/NavBar";
import Whatsapp from "@/components/WhatsApp";
import Salesiq from "@/components/zohochatbot/Salesiq";
import type { Metadata } from "next";
import { COUNTRY_HREFLANG } from "@/lib/hreflang";
import "./globals.scss";

const SITE = "https://usa.fielmente.com";
const TITLE = "Hotel & Restaurant Marketing Company in the USA | Fielmente";
const DESCRIPTION =
  "Hotel and restaurant marketing in the USA: SEO, Google Ads, social media, Google Business Profile and OTA management that grow your direct bookings.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE}/`,
    // Same hreflang set as the country sites (italy.fielmente.com, …), which list this site as en-US.
    // Hreflang only counts when every page in the set links back, so this site must list them too.
    languages: COUNTRY_HREFLANG,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Fielmente", url: `${SITE}/` }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/`,
    siteName: "Fielmente",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE}/images/fielmente-usa-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Hotel concierge with a guest's suitcase at a hotel reception",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE}/images/fielmente-usa-og.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Salesiq />
      </head>
      <body suppressHydrationWarning={true}>
        <NavBar />
        {children}
        <Footer2 />
        <Whatsapp />
        {/* <Call /> */}
      </body>
    </html>
  );
}
