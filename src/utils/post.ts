import { enPost, zhPost } from 'contentlayer/generated'
import { compareDesc } from 'date-fns/compareDesc'

export const sortPosts = <T extends zhPost | enPost>(postA: T, postB: T) =>
  compareDesc(postA.formattedData, postB.formattedData)

export const getPostURL = (post: zhPost | enPost) => `/article/${post.slug}`
