import { LinkTo } from "@/components/shared/link-to"
import type { BlogPost } from "@/types/blog/blog"
import { cn } from "@/lib/utils"

type BlogPostCardProps = {
  post: BlogPost
  readMoreArrowSrc: string
  className?: string
}

export function BlogPostCard({
  post,
  readMoreArrowSrc,
  className,
}: BlogPostCardProps) {
  return (
    <LinkTo
      href={`/blog/${post.slug}`}
      className={cn(
        "block w-full max-w-[431px] rounded-2xl border border-solid border-n10 bg-white p-3.5 shadow-[0px_2px_2px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0px_4px_12px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <article className="mx-auto flex w-full max-w-[401px] flex-col gap-4 lg:max-w-none">
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

            <span className="inline-flex items-center gap-2 font-geist text-base font-medium leading-[1.5] text-brand">
              Read More
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={readMoreArrowSrc}
                width={16}
                height={16}
                className="size-4"
              />
            </span>
          </div>
        </div>
      </article>
    </LinkTo>
  )
}
