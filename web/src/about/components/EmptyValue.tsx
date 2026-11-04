export function EmptyValue({ label }: { label: string }) {
  return <span className="org-empty"><span aria-hidden="true">—</span><span className="sr-only">{label}</span></span>
}
