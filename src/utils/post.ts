import { ENPost, ZHPost } from 'contentlayer/generated'
import { compareDesc } from 'date-fns/compareDesc'

export const sortPosts = <T extends ZHPost | ENPost>(postA: T, postB: T) =>
  compareDesc(postA.formattedData, postB.formattedData)

export const getPostURL = (post: ZHPost | ENPost) => `/article/${post.slug}`
