export default function AuditShield() {
  return <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}><label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>;
}
