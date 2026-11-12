"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

declare global {
  interface Window {
    $zoho: { salesiq?: { ready?: () => void; floatbutton?: { position: (position: "bottomright") => void }; floatwindow?: { visible: (state: "show" | "hide") => void } } };
  }
}
const WIDGET_SRC = "https://salesiq.zohopublic.in/widget?wc=siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df";

export default function Salesiq() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const mountedAt = useRef(0);
  const active = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    active.current = true; mountedAt.current = Date.now(); setMounted(true);
    return () => { active.current = false; if (timer.current) clearTimeout(timer.current); };
  }, []);

  function openChat() {
    if (status === "loading") return;
    setStatus("loading");
    // PageSense shares $zoho; keep its existing startup head start. Nothing loads until clicked.
    timer.current = setTimeout(() => {
      window.$zoho = window.$zoho || {};
      const salesiq = (window.$zoho.salesiq = window.$zoho.salesiq || {});
      const show = () => {
        salesiq.floatbutton?.position("bottomright");
        salesiq.floatwindow?.visible("show");
        if (active.current) setStatus("ready");
      };
      if (salesiq.floatwindow) { show(); return; }
      const previousReady = salesiq.ready;
      salesiq.ready = () => { previousReady?.(); show(); };
      if (document.getElementById("zsiqscript")) return;
      const script = document.createElement("script");
      script.id = "zsiqscript"; script.src = WIDGET_SRC; script.async = true;
      script.onerror = () => { script.remove(); if (active.current) setStatus("error"); };
      document.body.appendChild(script);
    }, Math.max(0, 8000 - (Date.now() - mountedAt.current)));
  }

  if (!mounted || status === "ready") return null;
  return createPortal(<button type="button" data-salesiq-launcher="click-to-open" aria-label={status === "error" ? "Retry live chat" : "Open live chat"} aria-busy={status === "loading"} disabled={status === "loading"} onClick={openChat}
    title={status === "loading" ? "Opening chat…" : "Chat with Fielmente"}
    style={{ position: "fixed", right: 16, bottom: "max(1rem, env(safe-area-inset-bottom))", width: 55, height: 55, border: 0, borderRadius: "50%", display: "grid", placeItems: "center", background: "#006ad4", color: "#fff", boxShadow: "0 4px 15px #110d3c30", cursor: status === "loading" ? "wait" : "pointer", zIndex: 999 }}>
    {status === "loading" ? <span style={{ fontSize: 24 }} aria-hidden="true">…</span> : <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 11h8M8 15h5"/></svg>}
  </button>, document.body);
}
