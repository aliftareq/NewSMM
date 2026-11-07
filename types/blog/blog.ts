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
