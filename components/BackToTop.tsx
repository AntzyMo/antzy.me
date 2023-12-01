'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function backToTop() {
    if (location.hash) {
      location.hash = ''
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <div
      title='Back to top'
      className={clsx(
        'flex-center bottom-3 cursor-pointer duration-300 fixed h-10 hover:bg-hex-8883 hover:op-100 right-3 rounded-full transition w-10',
        scroll > 300 ? 'op30' : 'op0! pointer-events-none'
      )}
      onClick={backToTop}
    >
      <div className='i-carbon:arrow-up  text-5' />
    </div>
  )
}
