"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import LeadDialog from "./LeadDialog";
import { auditEvent, auditOffer } from "@/lib/auditOffer";
import { isLeadThankYouPage, LEAD_SUBMITTED_EVENT, startLeadPrompt } from "@/lib/leadPrompt";

const AuditForm = dynamic(() => import("./AuditForm"));
type Profile = { country: string; dialCode: string; whatsappHref?: string };
type Props = { externalOpen?: boolean; onExternalClose?: () => void; automatic?: boolean; audience?: string; defaultCode?: string; profile?: Profile; regions?: Record<string, Profile>; topics?: Record<string, string> };

export default function AuditCapture({ externalOpen = false, onExternalClose, automatic = true, audience = "Hospitality Marketing", defaultCode = "+91", profile, regions, topics }: Props) {
  const pathname = usePathname();
  const offer = auditOffer(pathname, audience, topics);
  const [isOpen, setIsOpen] = useState(false);
  const [banner, setBanner] = useState(false);
  const [selected, setSelected] = useState<Profile>(profile || { country: "", dialCode: defaultCode });
  const excluded = isLeadThankYouPage(pathname);
  const resolve = useCallback(() => {
    const host = window.location.hostname.split(".")[0];
    const route = window.location.pathname.split("/").filter(Boolean).pop() || "europe";
    return profile || regions?.[host] || regions?.[route] || { country: "", dialCode: defaultCode };
  }, [profile, regions, defaultCode]);
  const close = useCallback(() => { setIsOpen(false); onExternalClose?.(); }, [onExternalClose]);
  const open = useCallback(() => { setSelected(resolve()); setBanner(false); setIsOpen(true); }, [resolve]);
  const showAutomatic = useCallback((trigger = "timer") => {
    const current = auditOffer(window.location.pathname, audience, topics);
    setSelected(resolve());
    auditEvent("audit_offer_view", current.topic, { trigger });
    if (window.matchMedia("(max-width: 767px)").matches) setBanner(true);
    else setIsOpen(true);
  }, [audience, topics, resolve]);
  useEffect(() => { if (automatic) return startLeadPrompt(showAutomatic); }, [automatic, showAutomatic]);
  useEffect(() => { if (automatic && !excluded) auditEvent("audit_strategy_page_view", offer.topic); }, [automatic, excluded, pathname, offer.topic]);
  useEffect(() => { if (externalOpen) { setBanner(false); setSelected(resolve()); } }, [externalOpen, resolve]);
  const visible = !excluded && (isOpen || externalOpen);
  useEffect(() => { if (visible) auditEvent("audit_form_open", offer.topic); }, [visible, offer.topic]);
  useEffect(() => {
    const done = () => setBanner(false);
    window.addEventListener(LEAD_SUBMITTED_EVENT, done);
    return () => window.removeEventListener(LEAD_SUBMITTED_EVENT, done);
  }, []);
  useEffect(() => {
    if (!banner || excluded) return;
    document.body.classList.add("fielmente-audit-banner-open");
    return () => document.body.classList.remove("fielmente-audit-banner-open");
  }, [banner, excluded]);

  return <>
    <LeadDialog open={visible} onClose={close} maxWidth={520} closeOnSubmit={false}>
      <AuditForm offer={offer} initialCode={selected.dialCode} country={selected.country} onDone={close} />
    </LeadDialog>
    {banner && !excluded && createPortal(<aside data-audit-mobile-prompt="v2" aria-label="Free audit offer"
      style={{ position: "fixed", left: 80, right: 80, bottom: "max(1rem, env(safe-area-inset-bottom))", maxWidth: 340, marginInline: "auto", padding: "12px 10px 10px", border: "1px solid #e4e1eb", borderRadius: 14, background: "#fff", color: "#110d3c", boxShadow: "0 5px 30px #110d3c30", zIndex: 100 }}>
      <style>{`.fielmente-audit-banner-open [data-mobile-bar]{visibility:hidden!important;pointer-events:none!important}`}</style>
      <button type="button" aria-label="Dismiss audit offer" onClick={() => { setBanner(false); auditEvent("audit_offer_dismiss", offer.topic); }} style={{ position: "absolute", top: -18, right: -12, width: 40, height: 40, border: "1px solid #e4e1eb", borderRadius: "50%", background: "#fff", color: "#110d3c", fontSize: 24, cursor: "pointer" }}>×</button>
      <p style={{ margin: "0 0 8px", paddingRight: 8, fontSize: 13, lineHeight: 1.3, fontWeight: 700 }}>{offer.shortTitle}</p>
      <button type="button" onClick={open} style={{ width: "100%", minHeight: 40, border: 0, borderRadius: 8, background: "#f26633", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Get free audit</button>
    </aside>, document.body)}
  </>;
}
