import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { formatDate } from 'date-fns/format'
import { slug as githubSlug } from 'github-slugger'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
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
    slug: {
      type: 'string',
      resolve: (post) => {
        const [name, locale] = post._raw.sourceFileName.split('.')
        return `${name}_${locale}`
      },
    },
    name: {
      type: 'string',
      resolve: (post) => {
        const [name] = post._raw.sourceFileName.split('.')
        return name
      },
    },
    locale: {
      type: 'string',
      resolve: (post) => {
        const [, locale] = post._raw.sourceFileName.split('.')
        return locale || 'en'
      },
    },
    formattedData: { type: 'string', resolve: (post) => formatDate(post.date, 'yyyy-MM-dd') },
    toc: {
      type: 'json',
      resolve: (post) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
        const headings = Array.from(post.body.raw.matchAll(regXHeader)).map(({ groups }) => {
          const flag = groups?.flag
          const content = groups?.content
          return {
            level: flag?.length,
            text: content,
            slug: content ? githubSlug(content) : undefined,
          }
        })
        return headings
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'src/posts',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypeSlug],
      [
        // @ts-expect-error -- TODO: fix type error
        rehypePrettyCode,
        rehypePrettyCodeOptions,
      ],
    ],
  },
})
