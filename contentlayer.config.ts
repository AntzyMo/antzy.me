import os from 'node:os'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Index = defineDocumentType(() => ({
  name: 'Index',
  filePathPattern: 'index.mdx',
  contentType: 'mdx'
}))

function getToc(content: string) {
  return (
    content
      .split(os.EOL)
      /* I这里只解析h2 */
      .filter(line => line.match(/^##\s/))
      .map(line => line.replace('##', '').trim())
      .map(item => {
        const val = item.split(' ').map(item => item.toLocaleLowerCase())

        return {
          text: item,
          value: val.join('-')
        }
      })
  )
}

const Blogs = defineDocumentType(() => ({
  name: 'Blogs',
  filePathPattern: 'blogs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      required: true
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.split('/').at(-1)
    },
    transDate: {
      type: 'string',
      resolve: doc => {
        const [year, mouth, day] = doc.date.split('T')[0].split('-')
        return `${year}年${mouth}月${day}日`
      }
    },
    toc: {
      type: 'list',
      resolve: doc => {
        return getToc(doc.body.raw)
      }
    }
  }
}))

export default makeSource({
  contentDirPath: './contents',
  documentTypes: [Index, Blogs],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        }
      ]
    ]
  }
})
