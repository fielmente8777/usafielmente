"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Whatsapp() {
  const pathName = usePathname();

  if (pathName === "/thank-you/") {
    return null;
  }
  return (
    <div className="fixed bottom-24 lg:left-10 left-4 z-20 cursor-pointer">
      <Link
        href="https://wa.me/919501868775?text=Hello+I+would+like+to+know+more+about+Fielmente+Hospitality+Marketing+Agency"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full flex shadow-2xl items-center justify-center bg-green-500 hover:bg-green-600 transition-all hover:shadow-2xl"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={29} color="white" />
      </Link>
    </div>
  );
}

export default Whatsapp;

// https://api.whatsapp.com/send/?phone=919501868775&text=Hello+I+would+like+to+know+more+about+Fielmente+Hospitality+Marketing+Agency%21&type=phone_number&app_absent=0
