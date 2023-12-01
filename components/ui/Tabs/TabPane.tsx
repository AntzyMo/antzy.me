interface TabPaneProps {
  children: React.ReactNode[]
  label: string
}
export default function TabsPane(props: TabPaneProps) {
  const { children } = props
  return (
    <> { children } </>
  )
}
