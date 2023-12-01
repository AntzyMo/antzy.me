'use client'
import { useMDXComponent } from 'next-contentlayer/hooks'

import BlogComponents from '@/components/blog'
import { GridBox, Image, Tabs } from '@/components/ui'

import { Link, Pre } from './mdx'

const mdxComponents = {
  a: Link,
  pre: Pre,
  Tabs,
  GridBox,
  Image,
  ...BlogComponents
}

export default function MDXContent({ code }: {
  code: string
}) {
  const MDXContent = useMDXComponent(code)

  return <MDXContent components={mdxComponents} />
}
