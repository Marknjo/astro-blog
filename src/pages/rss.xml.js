import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { formatBlogPosts, slugify } from "../js/utils"

export async function GET(context) {
  const blogPosts = await getCollection("posts")
  const blog = formatBlogPosts(blogPosts)

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: "Astro Blog",
    description: "A blog proudly built with Astro",
    site: context.site,
    items: blog.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.description,
      author: post.author,
      commentsUrl: `/author/${slugify(post.author)}/`,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.url}/`,
    })),
  })
}
