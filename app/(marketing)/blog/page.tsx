import type { Metadata } from "next"

import { BlogHeroControls } from "@/components/shared/blog/blog-hero-controls"
import { BlogPostCard } from "@/components/shared/blog/blog-post-card"
import { BlogBreadcrumb } from "@/components/shared/blog/blog-breadcrumb"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import {
  blogCategories,
  blogPageContent,
  blogPosts,
} from "@/data/blog/blog"
import type { BlogPost } from "@/types/blog/blog"

export const metadata: Metadata = {
  title: "Blog | NewSMM",
  description: blogPageContent.hero.description,
}

function chunkBlogPosts(posts: BlogPost[], rowSize: number) {
  const rows: BlogPost[][] = []

  for (let index = 0; index < posts.length; index += rowSize) {
    rows.push(posts.slice(index, index + rowSize))
  }

  return rows
}

const BLOG_POSTS_PER_ROW = 3

export default function BlogPage() {
  const { breadcrumb, assets } = blogPageContent
  const blogPostRows = chunkBlogPosts(blogPosts, BLOG_POSTS_PER_ROW)

  return (
    <main className="m-0 bg-white p-0">
      <section className="landing-hero-shell relative isolate overflow-x-clip bg-white min-h-[680px] pb-[120px]">
        <HeroBackgroundLayer
          content={{ backgroundHero: assets.heroBackgroundSrc }}
        />

        <MarketingNavbar overlay mountReveal />

        <div className="info-container relative z-10 flex flex-col items-center gap-8 px-4 pt-[118px] sm:gap-8 sm:px-6 sm:pt-[140px] lg:px-8 lg:pt-[157px]">
          <BlogBreadcrumb
            chevronSrc={assets.breadcrumbChevronSrc}
            items={[
              { label: breadcrumb.homeLabel, href: "/" },
              { label: breadcrumb.currentLabel, isCurrent: true },
            ]}
          />

          <BlogHeroControls
            categories={blogCategories}
            content={{
              hero: blogPageContent.hero,
              assets: blogPageContent.assets,
            }}
          />
        </div>
      </section>

      <section
        className="relative z-10 flex flex-col items-center bg-white py-20"
        aria-labelledby="blog-posts-heading"
      >
        <h2 id="blog-posts-heading" className="sr-only">
          Blog posts
        </h2>
        <div className="info-container flex w-full max-w-[1320px] flex-col gap-4 px-4 sm:px-6 lg:px-8">
          {blogPostRows.map((row, rowIndex) => (
            <ul
              key={`blog-row-${rowIndex}`}
              className="flex list-none flex-col items-center gap-4 p-0 lg:flex-row lg:items-stretch lg:justify-between"
            >
              {row.map((post) => (
                <li
                  key={post.id}
                  className="m-0 flex w-full justify-center p-0 lg:w-[431px] lg:shrink-0 lg:justify-start"
                >
                  <BlogPostCard
                    post={post}
                    readMoreArrowSrc={assets.readMoreArrowSrc}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    </main>
  )
}
