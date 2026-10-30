export type AuditOffer = { topic: string; title: string; shortTitle: string };
export function auditOffer(path: string, fallback = "Hospitality Marketing", topics: Record<string, string> = {}): AuditOffer {
  const slug = path.split("/").filter(Boolean)[0] || "";
  const route = path.toLowerCase();
  const choices: [RegExp, string, string][] = [
    [/google-ads|ppc/, "Google Ads", "Google Ads"], [/restaurant|cloud-kitchen/, "Restaurant Marketing", "restaurant"],
    [/resort/, "Resort Marketing", "resort"], [/seo/, "SEO", "SEO"], [/social-media/, "Social Media", "social media"],
    [/website/, "Website", "website"], [/ota|revenue/, "OTA & Revenue", "OTA"], [/hotel/, "Hotel Marketing", "hotel"],
  ];
  const match = choices.find(([pattern]) => pattern.test(route));
  const topic = match?.[1] || topics[slug] || fallback;
  const short = match?.[2] || (/restaurant/i.test(topic) ? "restaurant" : /hotel/i.test(topic) ? "hotel" : "marketing");
  return { topic, title: `Get a free ${topic} audit`, shortTitle: `Free ${short} audit` };
}

export const AUDIT_CODES = ["+91", "+971", "+1", "+44", "+34", "+49", "+39", "+33", "+46", "+30", "+41", "+351", "+31", "+43", "+385", "+353", "+32", "+47", "+45", "+354", "+90", "+966", "+974", "+968", "+20", "+212", "+960", "+94", "+977", "+975", "+66", "+62", "+84", "+60", "+65", "+63", "+81", "+230", "+248", "+27", "+254", "+255", "+52", "+55", "+61", "+64"];
export type AuditSubmission = { form: HTMLFormElement; startedAt: number; name: string; phone: string; countryCode: string; email: string; property: string; message: string; topic: string; country: string };
export function auditProblem(data: Pick<AuditSubmission, "name" | "phone" | "countryCode" | "email">) {
  if (data.name.trim().length < 2 || data.name.length > 80 || /https?:|www\.|<|>/i.test(data.name)) return "Please enter your name.";
  const phone = data.phone.replace(/\D/g, "");
  if (!/^\+\d{1,4}$/.test(data.countryCode) || phone.length < 7 || phone.length > 15) return "Please enter a valid phone number.";
  if (data.countryCode === "+91" && (!/^[6-9]\d{9}$/.test(phone) || /^(\d)\1{9}$/.test(phone))) return "Please enter a valid 10-digit Indian mobile number.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return "Please enter a valid email address or leave it blank.";
  return null;
}
export function auditDescription(data: AuditSubmission) {
  return [`Audit offer v2: ${data.topic}`, data.country && `Market: ${data.country}`, data.property && `Property: ${data.property}`, data.message && `Message: ${data.message}`].filter(Boolean).join("\n");
}
export function auditEvent(event: string, topic: string, extra: Record<string, string> = {}) {
  const target = window as typeof window & { dataLayer?: unknown[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, form_name: "growth_audit", audit_version: "audit_v2", audit_topic: topic, page_path: window.location.pathname, page_host: window.location.hostname, ...extra });
}
