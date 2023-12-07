'use client'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { allBlogs } from 'contentlayer/generated'
import type { Blogs } from 'contentlayer/generated'

import Button from '@/components/ui/Button'

interface Tag {
  name: string
  active: boolean
}

const blogsList = allBlogs.sort((a, b) => new Date(b.transDate).getTime() - new Date(a.transDate).getTime())
const fuse = new Fuse(blogsList, { keys: ['title', 'tags'] })

function createTags(list: Blogs[]) {
  const tagList = list.map(item => item.tags).flat()

  // 统计标签出现次数
  const tagCountMap: Record<string, number> = {}
  tagList.forEach(item => {
    tagCountMap[item] = tagCountMap[item] ? tagCountMap[item] + 1 : 1
  })

  // 筛选出大于1的进行从大到小排序
  const arr = Object.entries(tagCountMap)
    .filter(item => item[1] > 1)
    .sort((a, b) => b[1] - a[1])
    .map(item => ({
      name: item[0],
      active: false
    }))

  return arr
}

export default function Page() {
  const [list, setList] = useState(blogsList)
  const [tags, setTags] = useState<Tag[]>(() => createTags(blogsList))

  const searchPost = useRef('')

  // 模糊搜索

  function selectTag(index: number) {
    const tagsList = tags.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          active: !item.active
        }
      } else {
        return {
          ...item,
          active: false
        }
      }
    })

    setTags(tagsList)
    search({
      tags: tags[index].active ? undefined : tags[index].name,
      title: searchPost.current || undefined
    })
  }

  // 模糊搜索
  function search(params: { tags: string | undefined; title: string | undefined }) {
    const options = JSON.parse(JSON.stringify(params))

    const isNullVal = Object.values(options).filter(Boolean)
    if (isNullVal)
      return setList(blogsList)

    setList(fuse.search(options).map(it => it.item))
  }

  return (
    <article>
      <div className='h-full m-auto prose mt-26 px5'>
        <div className='mb-6'>
          <div className='mb-2 flex items-center border-b border-b-solid border-b-black/20 dark:border-b-white/20'>
            <input
              className='font-sans c-fg-deeper op-80 pb-1 pl-2 placeholder:op-50 text-4.5 w-full'
              placeholder='Search...'
              onChange={e => {
                searchPost.current = e.target.value
                search({
                  title: e.target.value,
                  tags: tags?.find(item => item.active)?.name || undefined
                })
              }}
            />
            <div className=' cursor-pointer hover:op-70 i-carbon:search-locate op-50 text-5' />
          </div>

          <div className='gap-2 flex items-center' >
            { tags.map((tag, index) => (
              <Button
                active={tag.active}
                key={tag.name}
                onClick={() => selectTag(index)}
              >
                { tag.name }
              </Button>
            )) }
          </div>
        </div>

        { list.map(item => (
          <Link
            className='gap-3 c-fg! hover:c-fg1! mb-3 relative transition flex items-center' href={item._raw.flattenedPath}
            key={item.slug}
          >
            <span className='font-bold text-4.5'>{ item.title }</span>
            <span className='text-3 opacity-50'>{ item.transDate }</span>
          </Link>
        )) }
      </div>
    </article>
  )
}
