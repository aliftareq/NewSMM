import { blogPageContent, blogPosts } from "@/data/blog/blog"
import type { BlogPostDetail, BlogDetailPageContent } from "@/types/blog/blog"

const BLOG_IMG = "/images/pages/blog"
const DETAIL_IMG = `${BLOG_IMG}/details`

const SAMPLE_PARAGRAPHS = [
  `TikTok isn't the new kid anymore — it's the main stage. With over 2 billion monthly active users globally and 153 million in the US alone, the platform has evolved from a Gen Z playground into the most powerful discovery engine in social media. The era of passive consumption is over; users arrive with intention, search with curiosity, and leave with purchases.`,
  `The numbers tell a decisive story. TikTok's average engagement rate of 3.7% dwarfs Instagram's 0.48% and Facebook's 0.15%. That's not a slight advantage — it's a different league entirely. For SMM professionals managing client portfolios, ignoring TikTok means leaving the highest-engagement real estate on the internet untouched.`,
  `But here's the shift that matters most for 2026: TikTok is now a search engine. 67% of Gen Z users search TikTok before Google for product reviews, restaurant recommendations, and how-to content. TikTok search queries have grown 174% year-over-year. If your clients aren't optimizing for TikTok SEO, they're invisible to the platform's most intentional users.`,
]

const detailSections: BlogPostDetail["sections"] = [
  {
    id: "promote-on-tiktok",
    indexLabel: "01",
    title: "How to Promote Products on TikTok",
    paragraphs: SAMPLE_PARAGRAPHS,
    media: "wide-gray",
  },
  {
    id: "engage-audience",
    indexLabel: "02",
    title: "Engage with Your Audience",
    paragraphs: SAMPLE_PARAGRAPHS,
    media: "dual-dark",
  },
]

const tableOfContents = [
  {
    id: detailSections[0]!.id,
    label: detailSections[0]!.title,
  },
  ...Array.from({ length: 7 }, () => ({
    id: detailSections[1]!.id,
    label: detailSections[1]!.title,
  })),
]

const authorProfile: BlogPostDetail["authorProfile"] = {
  name: "Seam Rahman",
  role: "Head of Growth Strategy",
  avatarSrc: `${DETAIL_IMG}/author.png`,
  social: {
    facebookSrc: `${DETAIL_IMG}/social-facebook.svg`,
    instagramSrc: `${DETAIL_IMG}/social-instagram.svg`,
    linkedinSrc: `${DETAIL_IMG}/social-linkedin.svg`,
  },
}

const sharedDetailFields = {
  titleMain: "How to Promote Products",
  titleHighlight: "on TikTok",
  authorName: "Seam Rahman",
  publishDateLabel: "05 March, 2026",
  updatedAtLabel: "05 March, 2026",
  readTimeLabel: "18 Min Total Read",
  tableOfContents,
  sections: detailSections,
  authorProfile,
}

export const blogDetailPageContent: BlogDetailPageContent = {
  breadcrumbDetailLabel: "Blog details",
  assets: {
    breadcrumbChevronSrc: blogPageContent.assets.breadcrumbChevronSrc,
    readMoreArrowSrc: blogPageContent.assets.readMoreArrowSrc,
    heroBackgroundSrc: blogPageContent.assets.heroBackgroundSrc,
    relatedArrowPrevSrc: `${DETAIL_IMG}/related-arrow-prev.svg`,
    relatedArrowNextSrc: `${DETAIL_IMG}/related-arrow-next.svg`,
  },
}

export function getBlogPostBySlug(slug: string): BlogPostDetail | undefined {
  const post = blogPosts.find((entry) => entry.slug === slug)
  if (!post) return undefined

  return {
    ...post,
    ...sharedDetailFields,
  }
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

export function getRelatedBlogPosts(slug: string) {
  return blogPosts.filter((post) => post.slug !== slug)
}
