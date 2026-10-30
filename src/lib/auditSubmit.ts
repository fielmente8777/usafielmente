import { auditDescription, type AuditSubmission } from "./auditOffer";
export async function submitAudit(data: AuditSubmission): Promise<{ ok: boolean; message?: string }> {
  if (new FormData(data.form).get("company_website")) return { ok: true };
  const response = await fetch("https://nexon.eazotel.com/eazotel/addcontacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Domain: "fielmente", Name: data.name, email: data.email, Contact: data.countryCode + data.phone, Description: auditDescription(data), created_from: "webform", source_url: window.location.href }), signal: AbortSignal.timeout(20000) });
  const result = await response.json().catch(() => ({}));
  return { ok: response.ok && result.Status === true };
}
