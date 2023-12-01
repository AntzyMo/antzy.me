'use client'
import { useTheme } from 'next-themes'

export default function TransDark() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark' ? 'light' : 'dark'
  return (
    <div className='dark:i-material-symbols:nightlight-outline-rounded dark:rotate--30 i-material-symbols:light-mode-outline logo-hover text-6 fixed top-6 right-7 transition transition-duration-400 z-999' onClick={() => setTheme(isDark)} />
  )
}
