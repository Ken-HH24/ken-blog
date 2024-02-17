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

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/article/${post._raw.flattenedPath}` },
    formattedData: { type: 'string', resolve: (post) => formatDate(post.date, 'yyyy-MM-dd') },
  },
}))

export default makeSource({
  contentDirPath: 'src/posts',
  documentTypes: [Post],
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
