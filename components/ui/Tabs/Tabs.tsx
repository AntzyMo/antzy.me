'use client'
import React, { useEffect, useRef, useState } from 'react'

import TabPane from './TabPane'
import Button from '@/components/ui/Button'

interface TabsProps {
  children: React.ReactNode[]
}

export const Tabs: React.FC<TabsProps> & { TabPane: typeof TabPane } = props => {
  const { children } = props

  const [tabsIdx, setTabsIdx] = useState(0)
  const [displayArrow, setDisplayArrow] = useState(false)

  const tabsDivRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<HTMLButtonElement[]>([])

  function changeStep(type: 'next' | 'prev') {
    if (type === 'next') {
      setTabsIdx(tabsIdx + 1)
    } else {
      setTabsIdx(tabsIdx - 1)
    }
    scrollStep(tabsIdx)
  }

  function scrollStep(idx: number) {
    const x = tabRefs.current?.[idx].offsetLeft - tabRefs.current?.[idx - 1 < 0 ? 0 : idx - 1].clientWidth - 10
    tabsDivRef.current!.scrollTo(x, 0)
  }

  useEffect(() => {
    const tabsDivWith = tabsDivRef.current!.clientWidth
    const tabRefsList = tabRefs.current.map(item => item.clientWidth)
    const stepRefsWidth = tabRefsList.reduce((a, b) => a + b, 0)
    if (tabsDivWith < stepRefsWidth) {
      setDisplayArrow(true)
    }
  }, [])

  return (
    <div className='relative'>
      { !!displayArrow && tabsIdx > 0 && (
        <div
          className="<sm:hidden absolute cursor-pointer hover:op-100 i-carbon:chevron-left left--7.5 op-30 text-6 top-2 transition z-1"
          onClick={() => changeStep('prev')}
        />
      ) }

      { !!displayArrow && tabsIdx < Object.keys(children).length - 1 && (
        <div
          className="absolute cursor-pointer hover:op-100 i-carbon:chevron-right op-30 right--7.5 text-6 top-2 transition z-1"
          onClick={() => changeStep('next')}
        />
      ) }

      <div
        className="flex-center gap-2 of-hidden of-x-auto pb-2 scroll-smooth flex justify-start flex-nowrap"
        ref={tabsDivRef}
      >
        { [...children].map((item, index) => {
          return (
            <Button
              active={tabsIdx === index}
              className='flex-1 py-2.4'
              key={index}
              ref={node => tabRefs.current.push(node!)}
              onClick={() => setTabsIdx(index)}
            >
              <span className="mr-1">{ index + 1 }.</span>
              <span>{ item?.props?.label } </span>
            </Button>
          )
        }) }
      </div>

      { children[tabsIdx] }

    </div>
  )
}

Tabs.TabPane = TabPane
