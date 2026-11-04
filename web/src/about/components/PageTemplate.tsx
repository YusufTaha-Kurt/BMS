import type { ReactNode } from 'react'

export function PageTemplate({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="page-width page">
      <header className="page-heading">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </div>
  )
}
