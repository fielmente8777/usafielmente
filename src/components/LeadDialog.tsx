"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { LEAD_SUBMITTED_EVENT, markLeadPromptShown } from "@/lib/leadPrompt";

export default function LeadDialog({ open, onClose, children, maxWidth = 768 }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    markLeadPromptShown();
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    window.addEventListener(LEAD_SUBMITTED_EVENT, onClose);
    return () => {
      window.removeEventListener(LEAD_SUBMITTED_EVENT, onClose);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      <style>{`dialog[data-fielmente-lead-popup]::backdrop { background: rgba(17, 13, 60, .65); }`}</style>
      <dialog
        ref={dialogRef}
        data-fielmente-lead-popup="v1"
        aria-label="Free consultation"
        onCancel={onClose}
        onClose={onClose}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
        }}
        style={{ position: "fixed", inset: 0, margin: "auto", width: "calc(100% - 24px)", maxWidth, maxHeight: "calc(100dvh - 24px)", padding: 0, border: 0, borderRadius: 16, background: "#fff", color: "#110D3C", boxShadow: "0 24px 80px rgba(0,0,0,.35)", overflowY: "auto", overscrollBehavior: "contain" }}
      >
        {open && (
          <>
            <div style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", justifyContent: "flex-end", background: "#fff", padding: "4px 8px" }}>
              <button type="button" aria-label="Close consultation form" onClick={onClose}
                style={{ width: 44, height: 44, display: "grid", placeItems: "center", border: 0, borderRadius: "50%", background: "#F4F3F7", color: "#110D3C", cursor: "pointer", fontSize: 28, lineHeight: 1 }}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {children}
          </>
        )}
      </dialog>
    </>
  );
}
