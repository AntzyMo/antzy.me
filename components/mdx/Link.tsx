import Link from 'next/link'

export function LinkCom({ href, children }: React.PropsWithChildren<{ href: string }>) {
  const isNewPage = href.includes('http') ? '_blank' : ''

  return <Link className="link pb-.3 hover:c-fg1 transition" href={href} target={isNewPage}>{ children }</Link>
}
