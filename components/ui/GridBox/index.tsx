import clsx from 'clsx'

import './index.css'

interface GridBoxProps {
  className: string
}

export default function GridBox({ children, className }: React.PropsWithChildren<GridBoxProps>) {
  return <div className={clsx('gridbox min-h-25 border-base border-panel-border rounded flex-center', className)}>{ children }</div>
}
