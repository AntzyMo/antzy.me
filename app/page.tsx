import MDXContent from '@/components/MDXContent'
import { allIndices } from 'contentlayer/generated'

export default function Pages() {
  const blog = allIndices[0]

  return (
    <div className='m-auto prose pt-20'>
      <MDXContent code={blog.body.code} />
    </div>
  )
}
