import Footer2 from "@/components/Footer/Footer2";
import NavBar from "@/components/Header/NavBar";
import Whatsapp from "@/components/WhatsApp";
import type { Metadata } from "next";
import GlobalLeadPopup from "@/components/GlobalLeadPopup";
import "./globals.scss";

const SITE = "https://usa.fielmente.com";
const TITLE = "Hotel & Restaurant Marketing Company in the USA | Fielmente";
const DESCRIPTION =
  "Hotel and restaurant marketing in the USA: SEO, Google Ads, social media, Google Business Profile and OTA management that grow your direct bookings.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  // fielmente.com/hotel-marketing-agency-usa/ is the page meant to rank for US searches: it carries the
  // main domain's authority. This site targets the same searches, so when both were indexed Google kept
  // swapping them. It stays live for visitors and ads but is kept out of Google, and is no longer in the
  // country sites' hreflang set (they drop it in the same change).
  alternates: { canonical: `${SITE}/` },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
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
      </head>
      <body suppressHydrationWarning={true}>
        <NavBar />
        {children}
        <Footer2 />
        <Whatsapp />
        <GlobalLeadPopup />
      </body>
    </html>
  );
}
