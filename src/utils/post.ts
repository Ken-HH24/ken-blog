import { Post, allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns/compareDesc'

export const sortPosts = (postA: Post, postB: Post) =>
  compareDesc(postA.formattedData, postB.formattedData)

export const getPostURL = (post: Post) => `/article/${post.slug}`

export const getEnPosts = () => allPosts.filter((post) => post.locale === 'en')

export const getZhPosts = () => allPosts.filter((post) => post.locale === 'zh')
