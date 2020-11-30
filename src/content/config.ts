import { z, defineCollection } from "astro:content"

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    description: z.string(),
    draft: z.boolean(),
    category: z.string(),
  }),
})

export const collection = {
  posts: postsCollection,
}
