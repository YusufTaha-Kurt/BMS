import cop31Logo from '../assets/logo-cop31.png'

export function Cop31Mark({ alt, className }: { alt: string; className: string }) {
  return (
    <span className={`cop31-mark ${className}`}>
      <img src={cop31Logo} alt={alt} width="900" height="900" />
    </span>
  )
}
