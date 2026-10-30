// Only a session flag is stored; no visitor contact details are stored here.
const SESSION_KEY = "fielmente_lead_prompt_v1";
export const LEAD_SUBMITTED_EVENT = "fielmente:lead-submitted";
let memoryState = "";

function readState() {
  if (typeof document === "undefined") return "";
  let cookie = "";
  let stored = "";
  try {
    cookie = document.cookie.split("; ").find((item) => item.startsWith(`${SESSION_KEY}=`))?.split("=")[1] || "";
  } catch { /* Storage can be unavailable in private browsers. */ }
  try { stored = window.sessionStorage.getItem(SESSION_KEY) || ""; } catch { /* Use the in-memory fallback. */ }
  if ([cookie, stored, memoryState].includes("submitted")) return "submitted";
  return cookie || stored || memoryState;
}

function writeState(value: "shown" | "submitted") {
  if (typeof document === "undefined") return;
  memoryState = value;
  try { window.sessionStorage.setItem(SESSION_KEY, value); } catch { /* Cookie/memory fallback. */ }
  try {
    const host = window.location.hostname;
    const domain = host === "fielmente.com" || host.endsWith(".fielmente.com") ? "; Domain=fielmente.com" : "";
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${SESSION_KEY}=${value}; Path=/; SameSite=Lax${domain}${secure}`;
  } catch { /* Session storage/memory fallback. */ }
}

export function markLeadPromptShown() {
  if (readState() !== "submitted") writeState("shown");
}

export function markLeadSubmitted() {
  writeState("submitted");
  window.dispatchEvent(new Event(LEAD_SUBMITTED_EVENT));
}

export function leadPromptSuppressed() {
  return Boolean(readState());
}

export function isLeadThankYouPage(path: string) {
  return /(?:^|\/)thank-you\/?$/.test(path);
}

/** One minute of visible browsing, or a desktop pointer leaving at the top. */
export function startLeadPrompt(open: () => void) {
  if (leadPromptSuppressed()) return () => {};
  let visibleMs = 0;
  let lastTick = Date.now();
  let stopped = false;

  function stop() {
    stopped = true;
    window.clearInterval(timer);
    document.removeEventListener("mouseout", exitIntent);
    document.removeEventListener("visibilitychange", visibilityChanged);
    window.removeEventListener(LEAD_SUBMITTED_EVENT, stop);
  }

  function tryOpen() {
    if (stopped) return;
    if (leadPromptSuppressed()) { stop(); return; }
    if (document.visibilityState !== "visible" || isLeadThankYouPage(window.location.pathname)) return;
    // Let visitors finish an existing form or chat before prompting them.
    if (document.activeElement?.matches("input, textarea, select, iframe, [contenteditable='true']")) return;
    if (document.querySelector("dialog[open], [aria-modal='true']")) return;
    markLeadPromptShown();
    stop();
    open();
  }

  function exitIntent(event: MouseEvent) {
    if (visibleMs < 10_000 || event.relatedTarget !== null || event.clientY > 0) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    tryOpen();
  }

  function visibilityChanged() { lastTick = Date.now(); }

  const timer = window.setInterval(() => {
    const now = Date.now();
    if (document.visibilityState === "visible") visibleMs += Math.max(0, now - lastTick);
    lastTick = now;
    if (visibleMs >= 60_000) tryOpen();
  }, 1000);
  document.addEventListener("mouseout", exitIntent);
  document.addEventListener("visibilitychange", visibilityChanged);
  window.addEventListener(LEAD_SUBMITTED_EVENT, stop);
  return stop;
}
