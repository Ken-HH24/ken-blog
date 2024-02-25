import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { formatDate } from 'date-fns/format'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import { createCssVariablesTheme } from 'shiki'

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  // @ts-expect-error -- TODO: fix type error
  theme: createCssVariablesTheme({
    name: 'css-variables',
    variablePrefix: '--shiki-color-',
    variableDefaults: {},
    fontStyle: true,
  }),
}

const postGenerator =
  (locale: string): Parameters<typeof defineDocumentType>[0] =>
  () => ({
    name: `${locale.toUpperCase()}Post`,
    filePathPattern: `${locale}/**/*.mdx`,
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'string', required: true },
      date: { type: 'date', required: true },
    },
    computedFields: {
      slug: {
        type: 'string',
        resolve: (post) => {
          const [, slug] = post._raw.flattenedPath.split('/')
          return `${slug}_${locale}`
        },
      },
      metaName: {
        type: 'string',
        resolve: (post) => {
          const [, slug] = post._raw.flattenedPath.split('/')
          return slug
        },
      },
      locale: { type: 'string', resolve: () => locale },
      formattedData: { type: 'string', resolve: (post) => formatDate(post.date, 'yyyy-MM-dd') },
    },
  })

export const ZhPost = defineDocumentType(postGenerator('zh'))
export const EnPost = defineDocumentType(postGenerator('en'))

export default makeSource({
  contentDirPath: 'src/posts',
  documentTypes: [ZhPost, EnPost],
  mdx: {
    rehypePlugins: [
      [
        // @ts-expect-error -- TODO: fix type error
        rehypePrettyCode,
        rehypePrettyCodeOptions,
      ],
    ],
  },
})
