"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import { BlogPostCard } from "@/components/shared/blog/blog-post-card"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import type { BlogPost } from "@/types/blog/blog"
import { cn } from "@/lib/utils"

const relatedNavButtonClassName = cn(
  "group flex size-[38px] items-center justify-center rounded-[20.5px] bg-[#f3fbff] p-2",
  "shadow-[0px_2px_3px_rgba(18,50,98,0.12)] transition-colors hover:bg-brand",
)

const SLIDES_PER_VIEW_LG = 3
/** Matches `gap-4` between slides at `lg` (no `-ml-4` / `pl-4` gutter). */
const SLIDE_GAP_LG_PX = 16
/** Matches viewport `px-5` — keeps card shadows inside the clip. */
const VIEWPORT_INSET_X_PX = 20
/** Room for `shadow-[0px_2px_2px_…]` / hover shadow on edge cards. */
const CARD_SHADOW_BLEED_PX = 8

function lgSlideWidthForViewport(contentWidthPx: number) {
  const gaps = SLIDE_GAP_LG_PX * (SLIDES_PER_VIEW_LG - 1)
  const edgeBleed = CARD_SHADOW_BLEED_PX * 2
  return Math.floor(
    (contentWidthPx - gaps - edgeBleed) / SLIDES_PER_VIEW_LG,
  )
}

function getCarouselViewportElement(
  shell: HTMLElement,
  api?: CarouselApi,
): HTMLElement | null {
  const root = api?.rootNode()
  if (root) return root
  return shell.querySelector<HTMLElement>('[data-slot="carousel-content"]')
}

function getCarouselViewportContentWidth(
  shell: HTMLElement,
  api?: CarouselApi,
): number {
  const viewport = getCarouselViewportElement(shell, api)
  if (!viewport) {
    return Math.max(0, shell.clientWidth - VIEWPORT_INSET_X_PX * 2)
  }

  const styles = getComputedStyle(viewport)
  const paddingX =
    parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
  const contentWidth = viewport.clientWidth - paddingX

  return contentWidth > 0
    ? contentWidth
    : Math.max(0, viewport.clientWidth - VIEWPORT_INSET_X_PX * 2)
}

type BlogRelatedPostsProps = {
  posts: BlogPost[]
  readMoreArrowSrc: string
  arrowPrevSrc: string
  arrowNextSrc: string
}

function RelatedNavArrow({
  direction,
  arrowPrevSrc,
  arrowNextSrc,
}: {
  direction: "prev" | "next"
  arrowPrevSrc: string
  arrowNextSrc: string
}) {
  const rotationClassName =
    direction === "prev" ? "-scale-y-100 rotate-90" : "rotate-90"

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={arrowPrevSrc}
        width={24}
        height={24}
        className={cn("block size-6 group-hover:hidden", rotationClassName)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={arrowNextSrc}
        width={24}
        height={24}
        className={cn("hidden size-6 group-hover:block", rotationClassName)}
      />
    </>
  )
}

export function BlogRelatedPosts({
  posts,
  readMoreArrowSrc,
  arrowPrevSrc,
  arrowNextSrc,
}: BlogRelatedPostsProps) {
  const [api, setApi] = useState<CarouselApi>()
  const trackShellRef = useRef<HTMLDivElement>(null)
  const [lgSlideWidthPx, setLgSlideWidthPx] = useState<number | null>(null)

  const scrollPrev = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  useLayoutEffect(() => {
    const shell = trackShellRef.current
    if (!shell) return

    const measure = () => {
      const width = getCarouselViewportContentWidth(shell)
      if (
        window.matchMedia("(min-width: 1024px)").matches &&
        width > 0
      ) {
        setLgSlideWidthPx(lgSlideWidthForViewport(width))
      }
    }

    measure()
    requestAnimationFrame(measure)
  }, [])

  useEffect(() => {
    const shell = trackShellRef.current
    if (!shell) return undefined

    const updateSlideWidth = () => {
      const width = getCarouselViewportContentWidth(shell, api)
      const isLg = window.matchMedia("(min-width: 1024px)").matches

      if (isLg && width > 0) {
        setLgSlideWidthPx(lgSlideWidthForViewport(width))
      } else {
        setLgSlideWidthPx(null)
      }

      api?.reInit()
    }

    updateSlideWidth()

    const viewport = getCarouselViewportElement(shell, api) ?? shell
    const resizeObserver = new ResizeObserver(updateSlideWidth)
    resizeObserver.observe(viewport)

    const mq = window.matchMedia("(min-width: 1024px)")
    mq.addEventListener("change", updateSlideWidth)

    return () => {
      resizeObserver.disconnect()
      mq.removeEventListener("change", updateSlideWidth)
    }
  }, [api])

  if (posts.length === 0) {
    return null
  }

  const loop = posts.length > SLIDES_PER_VIEW_LG

  return (
    <section className="flex w-full flex-col gap-6" aria-labelledby="related-blogs-heading">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="related-blogs-heading"
          className="text-2xl font-medium leading-none text-[#202020]"
        >
          Related Blogs
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Show previous related posts"
            className={relatedNavButtonClassName}
            onClick={scrollPrev}
          >
            <RelatedNavArrow
              direction="prev"
              arrowPrevSrc={arrowPrevSrc}
              arrowNextSrc={arrowNextSrc}
            />
          </button>
          <button
            type="button"
            aria-label="Show next related posts"
            className={relatedNavButtonClassName}
            onClick={scrollNext}
          >
            <RelatedNavArrow
              direction="next"
              arrowPrevSrc={arrowPrevSrc}
              arrowNextSrc={arrowNextSrc}
            />
          </button>
        </div>
      </div>

      <div ref={trackShellRef} className="w-full">
        <Carousel
          setApi={setApi}
          className={cn(
            "w-full max-w-full",
            "[&_[data-slot=carousel-content]]:box-border",
            "[&_[data-slot=carousel-content]]:px-5",
            "[&_[data-slot=carousel-content]]:py-2",
          )}
          opts={{
            align: "start",
            loop,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            duration: 28,
            dragFree: false,
            watchResize: true,
          }}
        >
          <CarouselContent className="-ml-4 py-3 lg:ml-0 lg:gap-4">
            {posts.map((post) => (
              <CarouselItem
                key={post.id}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-auto lg:shrink-0 lg:grow-0 lg:pl-0"
                style={
                  lgSlideWidthPx != null
                    ? {
                        flexBasis: lgSlideWidthPx,
                        maxWidth: lgSlideWidthPx,
                        width: lgSlideWidthPx,
                      }
                    : undefined
                }
              >
                <div className="flex justify-center px-0.5 lg:justify-start lg:px-1">
                  <BlogPostCard
                    post={post}
                    readMoreArrowSrc={readMoreArrowSrc}
                    className="max-w-none min-w-0"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
