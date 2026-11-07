import type { BlogPostSection } from "@/types/blog/blog"

function SectionMedia({ media }: { media: BlogPostSection["media"] }) {
  if (media === "wide-gray") {
    return <div className="h-[267px] w-full rounded-3xl bg-[#eaeaea]" aria-hidden />
  }

  if (media === "dual-dark") {
    return (
      <div className="flex w-full flex-col gap-6 sm:flex-row">
        <div className="h-[374px] w-full rounded-3xl bg-[#0d0c10] sm:w-[622px] sm:shrink-0" aria-hidden />
        <div className="h-[374px] min-w-0 flex-1 rounded-3xl bg-[#0d0c10]" aria-hidden />
      </div>
    )
  }

  return null
}

type BlogDetailArticleProps = {
  sections: BlogPostSection[]
}

export function BlogDetailArticle({ sections }: BlogDetailArticleProps) {
  return (
    <article className="flex w-full max-w-[790px] flex-col gap-7">
      {sections.map((section, index) => (
        <div key={section.id} className="flex flex-col gap-8">
          <section id={section.id} className="flex scroll-mt-28 flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <p className="text-2xl font-medium leading-[1.48] text-[#202020]">
                  {section.indexLabel}
                </p>
                <h2 className="text-xl font-medium leading-[1.25] text-[#202020]">
                  {section.title}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-base font-normal leading-[1.35] text-n600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {section.media ? <SectionMedia media={section.media} /> : null}
          </section>
          {index < sections.length - 1 ? (
            <div className="h-px w-full bg-n40" aria-hidden />
          ) : null}
        </div>
      ))}
    </article>
  )
}
