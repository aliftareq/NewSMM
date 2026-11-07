import type { Metadata } from "next"

import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import { LinkTo } from "@/components/shared/link-to"
import {
  blogCategories,
  blogPageContent,
  blogPosts,
} from "@/data/blog/blog"
import type { BlogPost } from "@/types/blog/blog"

import { BlogHeroControls } from "./blog-hero-controls"

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

function BlogPostCard({
  post,
  readMoreArrowSrc,
}: {
  post: BlogPost
  readMoreArrowSrc: string
}) {
  return (
    <article className="w-full max-w-[431px] rounded-2xl border border-solid border-n10 bg-white p-3.5 shadow-[0px_2px_2px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex w-full max-w-[401px] flex-col gap-4">
        <div className="relative h-[249px] w-full overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={post.imageSrc}
            width={401}
            height={249}
            className="size-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_-6px_-6px_12px_0px_rgba(255,255,255,0.24),inset_6px_6px_12px_0px_rgba(255,255,255,0.2)]"
            aria-hidden
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 text-sm font-medium leading-[1.35] text-brand">
            <span>{post.publishedAtLabel}</span>
            <span>{post.author}</span>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="h-px w-full border border-dashed border-[#cdd0d8]" />
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-medium leading-[1.25] text-[#020618]">
                  {post.title}
                </h2>
                <p className="text-sm font-normal leading-[1.2] text-n600">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <LinkTo
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 font-geist text-base font-medium leading-[1.5] text-brand"
            >
              Read More
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={readMoreArrowSrc}
                width={16}
                height={16}
                className="size-4"
              />
            </LinkTo>
          </div>
        </div>
      </div>
    </article>
  )
}

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
          <div className="rounded-lg bg-white px-4 py-2.5">
            <nav
              className="flex items-center gap-1"
              aria-label="Breadcrumb"
            >
              <LinkTo
                href="/"
                className="text-base font-medium leading-[1.18] text-[#6a7283]"
              >
                {breadcrumb.homeLabel}
              </LinkTo>
              <span
                className="relative flex size-4 shrink-0 items-center justify-center"
                aria-hidden
              >
                <span className="-rotate-90">
                  <span className="relative block size-4 overflow-hidden">
                    <span className="absolute inset-[33.3%_21.07%_33.35%_20.83%]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        src={assets.breadcrumbChevronSrc}
                        width={9}
                        height={5}
                        className="absolute inset-0 block size-full max-w-none"
                      />
                    </span>
                  </span>
                </span>
              </span>
              <span className="text-base font-medium leading-[1.18] text-brand">
                {breadcrumb.currentLabel}
              </span>
            </nav>
          </div>

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
