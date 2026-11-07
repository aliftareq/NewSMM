import type { BlogCategory, BlogPageContent, BlogPost } from "@/types/blog/blog"

const BLOG_IMG = "/images/pages/blog"

export const blogPageContent: BlogPageContent = {
  breadcrumb: {
    homeLabel: "Home",
    currentLabel: "Blog",
  },
  hero: {
    title: "Our Digital Growth",
    titleHighlight: "Blog",
    description:
      "Explore the latest social media trends, expert marketing tips, and valuable insights from our blog to grow your online presence smarter and faster.",
    searchPlaceholder: "Search Blogs here...",
  },
  assets: {
    breadcrumbChevronSrc: `${BLOG_IMG}/breadcrumb-chevron.svg`,
    searchIconSrc: `${BLOG_IMG}/search-icon.svg`,
    readMoreArrowSrc: `${BLOG_IMG}/read-more-arrow.svg`,
    heroBackgroundSrc: "/images/landing/hero-background.png",
  },
}

export const blogCategories: BlogCategory[] = [
  { id: "all", label: "Category" },
  { id: "growth", label: "Category" },
  { id: "social", label: "Category" },
  { id: "tips", label: "Category" },
  { id: "case-studies", label: "Category" },
]

const blogCardCoverSrc = `${BLOG_IMG}/card-cover-4.png`

const basePost = {
  title: "Telegram Growth Case Study",
  excerpt:
    "However, just because you have a Telegram channel that you are using, does not mean...",
  publishedAtLabel: "10 March ,2026",
  author: "By John Edson",
}

export const blogPosts: BlogPost[] = Array.from({ length: 9 }, (_, index) => {
  const categoryId =
    blogCategories[(index % (blogCategories.length - 1)) + 1]?.id ?? "growth"

  return {
    id: `blog-post-${index + 1}`,
    slug: `telegram-growth-case-study-${index + 1}`,
    ...basePost,
    imageSrc: blogCardCoverSrc,
    categoryId,
  }
})
