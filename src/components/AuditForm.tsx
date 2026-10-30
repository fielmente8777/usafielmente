"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import AuditShield from "./AuditShield";
import { submitAudit } from "@/lib/auditSubmit";
import { AUDIT_CODES, auditEvent, auditProblem, type AuditOffer, type AuditSubmission } from "@/lib/auditOffer";
import { markLeadSubmitted } from "@/lib/leadPrompt";

export default function AuditForm({ offer, initialCode = "+91", country = "", onDone }: { offer: AuditOffer; initialCode?: string; country?: string; onDone: () => void }) {
  const id = useId();
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const value = (key: string) => String(values.get(key) || "").trim();
    const data: AuditSubmission = { form, startedAt: startedAt.current, name: value("name"), phone: value("phone").replace(/\D/g, ""), countryCode: value("countryCode"), email: value("email"), property: value("property"), message: value("message"), topic: offer.topic, country };
    const problem = auditProblem(data);
    if (problem) { setError(problem); setStatus("error"); return; }
    setStatus("sending"); setError("");
    try {
      const result = await submitAudit(data);
      if (!result.ok) throw new Error(result.message || "We couldn't save your request. Please try again.");
      auditEvent("generate_lead", offer.topic);
      auditEvent("audit_form_submit_success", offer.topic);
      const pixel = (window as typeof window & { oaiq?: (...args: unknown[]) => void }).oaiq;
      pixel?.("measure", "lead_created", { type: "customer_action" });
      markLeadSubmitted();
      setStatus("success");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Please try again.");
      setStatus("error");
      auditEvent("audit_form_submit_error", offer.topic);
    }
  }

  return <div className="fielmente-audit-form">
    <style>{`.fielmente-audit-form{padding:8px 24px 24px;color:#110d3c;background:#fff;font-family:inherit}.fielmente-audit-form h2{font-size:24px;line-height:1.25;margin:0 0 10px;font-weight:700}.fielmente-audit-form p{font-size:14px;line-height:1.5;margin:0 0 18px;color:#55536e}.fielmente-audit-form label{display:flex;flex-direction:column;gap:7px;font-size:14px;font-weight:600;margin-bottom:14px}.fielmente-audit-form input,.fielmente-audit-form select,.fielmente-audit-form textarea{font:inherit;font-size:16px;line-height:1.4;color:#110d3c;background:#fff;border:1px solid #cfcddc;border-radius:9px;padding:12px;min-height:48px;width:100%;box-sizing:border-box}.fielmente-audit-form input:focus,.fielmente-audit-form select:focus,.fielmente-audit-form textarea:focus{outline:2px solid #f26633;outline-offset:2px}.fielmente-audit-form summary{cursor:pointer;font-size:14px;margin:6px 0 14px;color:#55536e}.fielmente-audit-action{display:block;width:100%;min-height:48px;padding:12px;border:0;border-radius:9px;background:#f26633;color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer}.fielmente-audit-action:disabled{opacity:.65;cursor:wait}.fielmente-audit-form .audit-privacy{font-size:12px;margin:14px 0 0}.fielmente-audit-form a{color:#110d3c;text-decoration:underline}@media(max-width:400px){.fielmente-audit-form{padding:4px 18px 20px}.fielmente-audit-form h2{font-size:21px}}`}</style>
    {status === "success" ? <div role="status">
      <h2>Your audit request is received</h2><p>Our team will contact you about your {offer.topic.toLowerCase()} audit.</p>
      <button type="button" className="fielmente-audit-action" onClick={onDone}>Continue browsing</button>
    </div> : <form aria-label="Free marketing audit" onSubmit={send}>
      <h2>{offer.title}</h2><p>Share your details and our team will contact you about opportunities for your business.</p>
      <AuditShield />
      <label>Your name<input name="name" autoComplete="name" placeholder="Full name" minLength={2} maxLength={80} required /></label>
      <label htmlFor={`${id}-phone`}>Phone / WhatsApp number</label>
      <div style={{ display: "flex", gap: 8, marginTop: -7, marginBottom: 14 }}>
        <select name="countryCode" aria-label="Country code" defaultValue={initialCode} style={{ width: 90, flexShrink: 0 }}>
          {(AUDIT_CODES.includes(initialCode) ? AUDIT_CODES : [initialCode, ...AUDIT_CODES]).map(code => <option key={code}>{code}</option>)}
        </select>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone number" style={{ minWidth: 0 }} required />
      </div>
      <details><summary>Add more details (optional)</summary>
        <label>Email<input name="email" type="email" autoComplete="email" placeholder="Email address (optional)" /></label>
        <label>Hotel / restaurant name<input name="property" autoComplete="organization" placeholder="Business name (optional)" maxLength={150} /></label>
        <label>Message<textarea name="message" placeholder="What would you like help with? (optional)" rows={2} maxLength={1500} /></label>
      </details>
      {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
      <button type="submit" disabled={status === "sending"} className="fielmente-audit-action">{status === "sending" ? "Sending…" : "Get my free audit"}</button>
      <p className="audit-privacy">We use your details to respond to this request. <a href="https://fielmente.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy policy</a></p>
    </form>}
  </div>;
}
