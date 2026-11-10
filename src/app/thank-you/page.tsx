import type { Metadata } from "next";
import ThankUPopUp from "./ThankUPopUp";

// Shown after a form is sent: keep it out of search results.
export const metadata: Metadata = {
  title: "Thank You | Fielmente",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://usa.fielmente.com/thank-you/" },
};

export default function Page() {
  return <ThankUPopUp />;
}
