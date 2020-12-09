import siteData from "../data/siteData.json"
import { slugify, type TPost } from "./utils"

type TSiteData = {
  title: string
  description: string
  image: {
    src: string
    alt: string
  }
}

/*

"title": "My Astro Blog",
  "description": "My musings about the Astro framework",
  "image": {
    "src": "/images/image-default.jpg",
    "alt": "My Astro Blog"
  }
*/

export default function jsonLDGenerator({
  type,
  post,
}: {
  type: string
  post: TPost
}) {
  if (type === "post") {
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${post.url}"
        },
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image.src}",
        "author": {
          "@type": "Person",
          "name": "${post.author}",
          "url": "/author/${slugify(post.author)}"
        },
        "datePublished": "${post.date}"
      }
    </script>`
  }
  return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${(siteData as TSiteData).title}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`
}
