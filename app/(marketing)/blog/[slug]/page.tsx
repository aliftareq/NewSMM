import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogBreadcrumb } from "@/components/shared/blog/blog-breadcrumb"
import { BlogDetailArticle } from "@/components/shared/blog/blog-detail-article"
import { BlogDetailSidebar } from "@/components/shared/blog/blog-detail-sidebar"
import { BlogRelatedPosts } from "@/components/shared/blog/blog-related-posts"
import { HeroBackgroundLayer } from "@/components/shared/landing/hero-background"
import { MarketingNavbar } from "@/components/shared/landing/marketing-navbar"
import { blogPageContent } from "@/data/blog/blog"
import {
  blogDetailPageContent,
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blog/blog-detail"

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Blog | NewSMM" }
  }

  return {
    title: `${post.titleMain} ${post.titleHighlight} | NewSMM`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { assets, breadcrumbDetailLabel } = blogDetailPageContent
  const relatedPosts = getRelatedBlogPosts(slug)

  return (
    <main className="m-0 overflow-visible bg-white p-0">
      <section className="landing-hero-shell relative bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-x-clip">
          <HeroBackgroundLayer
            content={{ backgroundHero: assets.heroBackgroundSrc }}
          />
        </div>

        <MarketingNavbar overlay mountReveal />

        <div className="info-container relative z-10 flex flex-col items-center gap-11 px-4 pt-[118px] sm:px-6 sm:pt-[140px] lg:px-8 lg:pt-[157px]">
          <BlogBreadcrumb
            chevronSrc={assets.breadcrumbChevronSrc}
            mutedClassName="text-[#888e9c]"
            items={[
              { label: blogPageContent.breadcrumb.homeLabel, href: "/" },
              {
                label: blogPageContent.breadcrumb.currentLabel,
                href: "/blog",
              },
              { label: breadcrumbDetailLabel, isCurrent: true },
            ]}
          />

          <div className="flex w-full max-w-[674px] flex-col items-center gap-11 text-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-[36px] font-bold leading-[1.35] tracking-[0.36px] text-[#0e0e0e]">
                {post.titleMain}{" "}
                <span className="text-brand">{post.titleHighlight}</span>
              </h1>
              <p className="max-w-[526px] text-base font-normal leading-[1.2] text-n600">
                {post.excerpt}
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium leading-[1.35] text-n700">
                  Author
                </p>
                <p className="text-lg font-medium leading-[1.25] text-n700">
                  {post.authorName}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium leading-[1.35] text-n700">
                  Publish date
                </p>
                <p className="text-lg font-medium leading-[1.25] text-n700">
                  {post.publishDateLabel}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium leading-[1.35] text-n700">
                  Latest Update
                </p>
                <p className="text-lg font-medium leading-[1.25] text-n700">
                  {post.updatedAtLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-container relative z-30 mt-[63px] px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto w-full max-w-[1320px] -mb-[230px] overflow-hidden rounded-[28px] bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={post.imageSrc}
              width={1320}
              height={460}
              className="h-[460px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-white pt-[310px] pb-20">
        <div className="info-container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <BlogDetailArticle sections={post.sections} />
            <BlogDetailSidebar post={post} />
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 pt-0">
        <div className="info-container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1320px]">
            <BlogRelatedPosts
              posts={relatedPosts}
              readMoreArrowSrc={assets.readMoreArrowSrc}
              arrowPrevSrc={assets.relatedArrowPrevSrc}
              arrowNextSrc={assets.relatedArrowNextSrc}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
