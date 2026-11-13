import { SiGoogleplay } from "react-icons/si";
import { FiArrowUpRight, FiCheckCircle, FiMessageSquare, FiSmartphone } from "react-icons/fi";

const PLAY_STORE_LINK = "https://play.google.com/store/search?q=eazotel&c=apps&hl=en_IN";

/**
 * Branded, secondary app-discovery CTA. Preserves the main page's enquiry/contact CTA.
 * Play Store URL is the user-provided Eazotel search URL until a verified app-detail URL is available.
 */
export default function EazotelAppCTA() {
  return (
    <section aria-labelledby="eazotel-download-heading" className="relative isolate overflow-hidden bg-[#110D3C] py-14 text-white md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_10%,rgba(58,105,233,0.30),transparent_55%),radial-gradient(ellipse_at_8%_100%,rgba(242,102,51,0.18),transparent_55%)]" />
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-9 px-5 md:grid-cols-2 md:gap-12 md:px-8">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-[#FFB594]">
            <FiSmartphone size={16} aria-hidden="true" /> Fielmente · Part of Eazotel
          </p>
          <h2 id="eazotel-download-heading" className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            Take your hotel business <span className="text-[#FF9967]">wherever you go.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
            Download the Eazotel app to stay connected with guest enquiries and follow-ups while on the move. Fielmente is part of Eazotel's hospitality technology ecosystem.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#E4E9FC] sm:text-sm">
            <span className="rounded-full border border-white/20 px-3 py-2">Guest enquiries</span>
            <span className="rounded-full border border-white/20 px-3 py-2">CRM follow-ups</span>
            <span className="rounded-full border border-white/20 px-3 py-2">On-the-go access</span>
          </div>
          <a href={PLAY_STORE_LINK} target="_blank" rel="noopener noreferrer"
            aria-label="Find Eazotel on Google Play, opens a new tab"
            className="group mt-8 inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-white/30 bg-[#070917] px-5 py-3 text-white no-underline shadow-xl transition hover:-translate-y-0.5 hover:border-[#FF9967] hover:bg-[#191C36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <SiGoogleplay size={30} aria-hidden="true" />
            <span className="text-left leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/80">Get it on</span>
              <span className="block text-xl font-bold tracking-tight text-white">Google Play</span>
            </span>
            <FiArrowUpRight aria-hidden="true" size={20} className="ml-3 text-white/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="mt-3 text-xs text-white/60">Android · Opens the Eazotel search in Google Play</p>
        </div>
        <div aria-label="Illustration of the Eazotel mobile dashboard" className="relative mx-auto flex w-full max-w-[440px] justify-center py-3">
          <div aria-hidden="true" className="absolute inset-6 rounded-full bg-[#365ED9]/25 blur-3xl" />
          <div className="relative w-[245px] rotate-[3deg] rounded-[34px] border-[7px] border-[#464C74] bg-[#101631] p-[7px] shadow-2xl sm:w-[265px]">
            <div className="min-h-[375px] overflow-hidden rounded-[24px] bg-[#F7F9FD] text-[#1B2452] sm:min-h-[410px]">
              <div className="bg-[#243469] px-5 pb-8 pt-8 text-white">
                <p className="text-xs font-extrabold tracking-[0.15em] text-[#FFB08A]">EAZOTEL</p>
                <p className="mt-3 text-xl font-bold">Hospitality CRM</p>
                <p className="mt-1 text-xs text-white/70">Your guests, your conversations</p>
              </div>
              <div className="-mt-4 space-y-3 px-4">
                <div className="rounded-2xl bg-white p-4 shadow-lg shadow-[#1B2452]/10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#EDF2FF] p-2 text-[#4064DD]"><FiMessageSquare size={20} aria-hidden="true" /></span>
                    <div><p className="text-sm font-bold">Guest enquiries</p><p className="text-xs text-[#63718C]">Stay in touch</p></div>
                  </div>
                  <div className="mt-3 h-2 w-4/5 rounded-full bg-[#EBEDF3]" aria-hidden="true" />
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-lg shadow-[#1B2452]/10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#FFF0E8] p-2 text-[#DB6C3E]"><FiCheckCircle size={20} aria-hidden="true" /></span>
                    <div><p className="text-sm font-bold">CRM follow-ups</p><p className="text-xs text-[#63718C]">Stay organised</p></div>
                  </div>
                  <div className="mt-3 h-2 w-3/4 rounded-full bg-[#EBEDF3]" aria-hidden="true" />
                </div>
                <p className="pt-1 text-center text-[11px] font-semibold text-[#66718B]">Illustrative app preview</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 rounded-full border border-white/25 bg-[#242A52] px-4 py-2 text-xs font-semibold tracking-wide text-white/90 shadow-lg sm:right-3">
            Eazotel × Fielmente
          </div>
        </div>
      </div>
    </section>
  );
}
