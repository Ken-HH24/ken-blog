import type { Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns/compareDesc'

export const sortPosts = (postA: Post, postB: Post) =>
  compareDesc(postA.formattedData, postB.formattedData)
