import clsx from 'clsx'
import { forwardRef } from 'react'
import type { LegacyRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  active?: boolean
}

function Button({ children, className, active, ...rest }: React.PropsWithChildren<ButtonProps>, ref?: LegacyRef<HTMLButtonElement>) {
  return (
    <button
      ref={ref}
      className={clsx(
        'c-black cursor-pointer dark:c-white dark:hover:op-90 dark:op-80 px-3 py-1 rounded text-3 transition  text-start whitespace-nowrap',
        'border b-solid b-black b-op-20 hover:b-op-35  dark:b-white dark:b-op-20 dark:hover:b-op-30',
        { 'b-op-40! dark:op-90! dark:b-op-30! dark:bg-white dark:bg-op-6': active },
        className
      )}
      {...rest}
    >
      { children }
    </button>
  )
}

export default forwardRef(Button)
