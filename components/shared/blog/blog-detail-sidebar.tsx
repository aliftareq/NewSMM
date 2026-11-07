"use client"

import { useState } from "react"

import type { BlogPostAuthorProfile, BlogPostDetail } from "@/types/blog/blog"
import { cn } from "@/lib/utils"

const READ_PROGRESS_THUMB_SRC =
  "/images/pages/blog/details/read-progress-thumb.svg"

type BlogDetailSidebarProps = {
  post: Pick<
    BlogPostDetail,
    "readTimeLabel" | "tableOfContents" | "authorProfile"
  >
}

function ReadProgressBar() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-[15px] w-full items-center rounded-full bg-[rgba(62,62,62,0.14)] p-1">
        <div className="relative flex h-full w-[20%] min-w-[40px] items-center justify-end rounded bg-brand pr-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={READ_PROGRESS_THUMB_SRC}
            width={7}
            height={4}
            className="h-1 w-[7px] -scale-y-100"
          />
        </div>
      </div>
    </div>
  )
}

function AuthorCard({ profile }: { profile: BlogPostAuthorProfile }) {
  const socialItems = [
    profile.social.facebookSrc,
    profile.social.instagramSrc,
    profile.social.linkedinSrc,
  ]

  return (
    <div className="w-full rounded-[20px] border border-solid border-n30 bg-n20 p-4">
      <div className="flex w-full items-center gap-3.5">
        <div className="relative size-[100px] shrink-0 overflow-hidden rounded-[7.339px] backdrop-blur-[1.835px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={profile.avatarSrc}
            width={100}
            height={100}
            className="size-full rounded-[11.009px] object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium leading-[1.3] text-[#202020]">
              {profile.name}
            </p>
            <p className="text-sm font-medium leading-[1.35] text-[#4f586d]">
              {profile.role}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {socialItems.map((iconSrc) => (
              <span
                key={iconSrc}
                className="flex size-6 items-center justify-center rounded-[4.364px] border-[0.545px] border-solid border-white bg-white p-[5.454px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={iconSrc}
                  width={13}
                  height={13}
                  className="size-[13.091px]"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlogDetailSidebar({ post }: BlogDetailSidebarProps) {
  const [activeTocIndex, setActiveTocIndex] = useState(0)

  return (
    <aside className="flex w-full flex-col gap-6 lg:w-[460px] lg:max-w-[460px] lg:shrink-0">
      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-3">
          <p className="w-full text-base font-medium leading-[1.18] text-[#202020]">
            {post.readTimeLabel}
          </p>
          <ReadProgressBar />
        </div>

        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-medium leading-[1.3] text-[#202020]">
            Table of contents
          </h2>
          <ul className="flex w-full list-none flex-col gap-3 p-0">
            {post.tableOfContents.map((item, index) => {
              const isActive = index === activeTocIndex

              return (
                <li key={`${item.id}-${index}`} className="m-0 w-full p-0">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveTocIndex(index)}
                    className={cn(
                      "block w-full rounded-[12px] p-4 text-sm font-medium leading-[1.25] backdrop-blur-[100px]",
                      isActive
                        ? "bg-brand text-white"
                        : "bg-n30 text-[#202020]",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <AuthorCard profile={post.authorProfile} />
    </aside>
  )
}
