export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  publishedAtLabel: string
  author: string
  imageSrc: string
  categoryId: string
}

export type BlogPostSection = {
  id: string
  indexLabel: string
  title: string
  paragraphs: string[]
  media?: "wide-gray" | "dual-dark"
}

export type BlogPostAuthorProfile = {
  name: string
  role: string
  avatarSrc: string
  social: {
    facebookSrc: string
    instagramSrc: string
    linkedinSrc: string
  }
}

export type BlogPostDetail = BlogPost & {
  titleMain: string
  titleHighlight: string
  authorName: string
  publishDateLabel: string
  updatedAtLabel: string
  readTimeLabel: string
  tableOfContents: { id: string; label: string }[]
  sections: BlogPostSection[]
  authorProfile: BlogPostAuthorProfile
}

export type BlogCategory = {
  id: string
  label: string
}

export type BlogPageContent = {
  breadcrumb: {
    homeLabel: string
    currentLabel: string
  }
  hero: {
    title: string
    titleHighlight: string
    description: string
    searchPlaceholder: string
  }
  assets: {
    breadcrumbChevronSrc: string
    searchIconSrc: string
    readMoreArrowSrc: string
    heroBackgroundSrc: string
  }
}

export type BlogDetailPageContent = {
  breadcrumbDetailLabel: string
  assets: {
    breadcrumbChevronSrc: string
    readMoreArrowSrc: string
    heroBackgroundSrc: string
    relatedArrowPrevSrc: string
    relatedArrowNextSrc: string
  }
}
