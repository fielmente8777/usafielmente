import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Whatsapp() {
  return (
    <div
      role="group"
      aria-label="Contact Fielmente"
      className="fixed left-4 lg:left-10 z-20 flex flex-col items-start gap-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <a
        id="call-button"
        href={"tel:+919501868775"}
        aria-label="Call Fielmente"
        title="Call Fielmente"
        className="call-button flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#110D3C] text-white shadow-2xl transition-colors hover:bg-[#1B2231] focus-visible:ring-2 focus-visible:ring-[#F26633] focus-visible:ring-offset-2"
      >
        <FaPhoneAlt size={23} aria-hidden="true" />
      </a>
      <a
        id="whatsapp-button"
        href={"https://wa.me/+919501868775?text=Hello+I+would+like+to+know+more+about+Fielmente+Hospitality+Marketing+Agency"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="whatsapp-button flex h-12 w-12 flex-none items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-colors hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-[#F26633] focus-visible:ring-offset-2"
      >
        <FaWhatsapp size={29} aria-hidden="true" />
      </a>
    </div>
  );
}
