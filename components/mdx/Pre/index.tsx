export function Pre({ children, ...rest }: React.PropsWithChildren) {
  const { style, tabIndex, ...attr } = rest

  return (
    <pre {...attr} className="group relative p-4 border b-solid border-panel-border text-4.2 lh-6">
      { children }
    </pre>

  )
}
