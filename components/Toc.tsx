'use client'
import { useEffect, useState } from 'react'

export default function Toc({ list = [] }: { list: Record<'text' | 'value', string>[] }) {
  const [visibles] = useIntersectionObserverToc()

  if (list.length > 0) {
    return (
      <nav className='fixed -translate-x-44  z-1 bottom-8 grid gap-1'>
        { list.map(item => (
          <div className='cursor-pointer  text-3' key={item.value}>
            <a className={`${visibles.includes(item.value) ? 'op-100!' : ''} c-fg hover:op-60 op-40 transition`} href={`#${item.value}`}>
              { item.text }
            </a>
          </div>
        )) }
      </nav>
    )
  }

  return null
}

function useIntersectionObserverToc() {
  const [visibles, setVisibles] = useState<string[]>([])

  useEffect(() => {
    const { observerClose } = createIntersectionObserver(arr => {
      if (arr.length > 1) {
        const hightLightList = arr.filter(item => item.isIntersecting).map(item => item.target.id)
        if (hightLightList.join(',') === visibles.join(',')) return
        setVisibles(hightLightList)
      } else {
        if (arr[0].isIntersecting) {
          setVisibles([arr[0].target.id])
        } else {
          if (visibles.length > 1) {
            setVisibles([arr[0].target.id])
          }
        }
      }
    })

    function createIntersectionObserver(callback: IntersectionObserverCallback) {
      const elH = document.querySelectorAll('h2')
      const observer = new IntersectionObserver((...o) => callback(...o), {
        rootMargin: '0px',
        threshold: 0.1
      })
      elH.forEach(el => observer.observe(el))
      return {
        observerClose: () => elH.forEach(el => observer.unobserve(el))
      }
    }

    return () => {
      observerClose()
    }
  }, [visibles])

  return [visibles]
}
