import { EmptyValue } from './EmptyValue.tsx'

export function InformationFields({ fields, missing }: { fields: { id: string; label: string; value?: string }[]; missing: string }) {
  return <dl className="tech-fields">{fields.map(({ id, label, value }) => <div key={id} data-field={id}><dt>{label}</dt><dd>{value?.trim() || <EmptyValue label={missing} />}</dd></div>)}</dl>
}
