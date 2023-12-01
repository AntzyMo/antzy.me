import Toc from '@/components/Toc'
import MDXContent from '@/components/MDXContent'

import { allBlogs } from 'contentlayer/generated'

export default function Pages({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find(blog => blog.slug === params.slug)
  if (!blog) return '123'

  return (
    <div className='m-auto prose pt-20'>
      <h1>{ blog.title }</h1>
      <p className=" text-3 opacity-50 !-mt-6">
        <span>{ blog.transDate }</span> • <span >{ blog.tags.join('/') }</span>
      </p>
      <Toc list={blog.toc}/>
      <MDXContent code={blog.body.code} />
    </div>
  )
}
