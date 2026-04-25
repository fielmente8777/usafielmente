import Call from "@/components/Call";
import Footer2 from "@/components/Footer/Footer2";
import NavBar from "@/components/Header/NavBar";
import Whatsapp from "@/components/WhatsApp";
import Salesiq from "@/components/zohochatbot/Salesiq";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Hotel and restaurant marketing company in USA | fielmente",
  description:
    "We're the best hospitality marketing agency in India serving hotels, resorts restaurants, and cloud kitchens for more than 10 years.",
  keywords: "",
  alternates: {
    canonical: "https://https://usa.fielmente.com/",
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
  authors: [{ name: "Fielmente", url: "https://https://usa.fielmente.com/" }],
  openGraph: {
    title: "Hotel and restaurant marketing company in USA | fielmente",
    description:
      "We're the best hospitality marketing agency in India serving hotels, resorts restaurants, and cloud kitchens for more than 10 years.",
    url: "https://https://usa.fielmente.com/",
    siteName: "usa.Fielmente",
    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "https://https://usa.fielmente.com/images/Fielmente-og.png",
        width: 1200,
      },
    ],
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
