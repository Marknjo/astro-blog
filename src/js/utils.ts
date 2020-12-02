import type { CollectionEntry, CollectionKey } from "astro:content"

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-KE", {
    timeZone: "UTC",
  })
}

export type TPost = {
  url: string
  title: string
  date: string
  author: string
  image: { src: string; alt: string }
  description: string
  draft: boolean
  category: string
}

export type TBlogFormatterOPtions = {
  filterOutDrafts?: boolean
  filterOutFuturePosts?: boolean
  sortByDate?: boolean
  limit?: number
}

type TPostCol = CollectionEntry<"posts">[]

export function formatBlogPosts(
  posts: TPostCol,
  options: TBlogFormatterOPtions = {
    filterOutDrafts: true,
    filterOutFuturePosts: true,
    sortByDate: true,
    limit: undefined,
  },
): Array<TPost> {
  const { filterOutDrafts, filterOutFuturePosts, sortByDate, limit } = options

  const filteredPosts = posts.reduce((acc: TPost[], postCol) => {
    let post = postCol.data
    post.url = postCol.slug

    const { date, draft } = post

    // filter out Drafts if true
    if (filterOutDrafts && draft) return acc

    // filter out future posts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc

    // add post to acc
    acc.push(post)

    return acc
  }, [])

  // sort by date or randomize posts
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit when there is set
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit)
  }

  return filteredPosts
}
