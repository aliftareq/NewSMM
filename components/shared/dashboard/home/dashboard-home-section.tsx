"use client"

import { useState } from "react"

import {
  DashboardHomeCard,
  DashboardHomeCardDivider,
  DashboardHomeCardTitle,
  DashboardHomeGhostRow,
  DashboardHomeLinkArrow,
  DashboardHomeMutedRow,
  DashboardHomeOutlineButton,
  DashboardHomePrimaryButton,
  DashboardHomeTextLink,
} from "@/components/shared/dashboard/home/dashboard-home-ui"
import { PlatformIcon } from "@/components/shared/landing/services-explorer/services-explorer-ui"
import { LinkTo } from "@/components/shared/link-to"
import { dashboardHomeContent } from "@/data/dashboard/home"
import { serviceHeroContent } from "@/data/service/hero"
import type { DashboardHomeContent } from "@/types/dashboard/home"

type DashboardHomeSectionProps = {
  content?: DashboardHomeContent
}

function CountdownUnit({ value }: { value: string }) {
  return (
    <div className="rounded-xl border border-[#21aeff] bg-[#fafafb] px-[34px] py-3.5">
      <span className="text-lg font-semibold leading-[1.3] text-[#21aeff]">
        {value}
      </span>
    </div>
  )
}

/** Figma 25704:16042 — dashboard home */
export function DashboardHomeSection({
  content = dashboardHomeContent,
}: DashboardHomeSectionProps) {
  const [feedback, setFeedback] = useState("")
  const { assets } = content

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6">
      <header
        className="w-full rounded-[20px] border border-[#b1e5ff] px-5 py-6"
        style={{
          backgroundImage:
            "linear-gradient(114.79deg, rgb(198, 236, 255) 18.56%, rgb(242, 250, 255) 72.37%)",
        }}
      >
        <h1 className="text-[28px] font-semibold leading-[1.5] text-[#222e48]">
          {content.welcome.title}
        </h1>
        <p className="mt-1.5 text-base font-normal leading-[1.35] text-[#5b6477]">
          {content.welcome.email}
        </p>
      </header>

      <DashboardHomeCard>
        <DashboardHomeCardTitle>{content.updates.title}</DashboardHomeCardTitle>
        <div className="mt-6 flex flex-col gap-6">
          <p className="text-base font-normal leading-[1.35] text-[#404a60]">
            {content.updates.description}
          </p>
          <DashboardHomeCardDivider src={assets.cardDivider} />
          <ul className="flex flex-col gap-2">
            {content.updates.items.map((item) => (
              <li key={item.id}>
                <DashboardHomeGhostRow className="flex items-center justify-between gap-4">
                  <span className="flex min-w-0 items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={assets.notificationCheck}
                      width={20}
                      height={20}
                      className="size-5 shrink-0"
                    />
                    <span className="truncate text-base font-medium leading-[1.35] text-[#404a60]">
                      {item.message}
                    </span>
                  </span>
                  <span className="shrink-0 text-base font-medium leading-[1.35] text-[#404a60]">
                    {item.date}
                  </span>
                </DashboardHomeGhostRow>
              </li>
            ))}
          </ul>
          <DashboardHomeOutlineButton
            href={content.updates.olderUpdatesHref}
            className="w-[180px]"
          >
            {content.updates.olderUpdatesLabel}
          </DashboardHomeOutlineButton>
        </div>
      </DashboardHomeCard>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <DashboardHomeCard>
            <DashboardHomeCardTitle>{content.balance.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-normal leading-[1.35] text-[#404a60]">
                {content.balance.description}
              </p>
              <DashboardHomeTextLink
                href={content.balance.balanceHistoryHref}
                arrowSrc={assets.linkArrow}
              >
                {content.balance.balanceHistoryLabel}
              </DashboardHomeTextLink>
              <DashboardHomeCardDivider src={assets.cardDivider} />
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold leading-[1.3] text-[#222e48]">
                  {content.balance.amount}
                </p>
                <DashboardHomeOutlineButton
                  iconSrc={assets.addFundsPlus}
                  className="text-base"
                >
                  {content.balance.addFundsLabel}
                </DashboardHomeOutlineButton>
              </div>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard className="min-h-[410px]">
            <DashboardHomeCardTitle>{content.freeTrial.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base leading-[1.35] text-[#404a60]">
                {content.freeTrial.introBefore}
                <span className="font-semibold text-[#21aeff]">
                  {content.freeTrial.introHighlight}
                </span>
                {content.freeTrial.introAfter}
              </p>
              <DashboardHomeCardDivider src={assets.cardDivider} />
              <div className="flex flex-col gap-3">
                <p className="text-lg font-medium leading-[1.5] text-[#222e48]">
                  {content.freeTrial.selectLabel}
                </p>
                <div className="relative min-h-[188px] w-full max-w-[494px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={assets.freeTrialPanel}
                    className="absolute left-0 top-2 h-[180px] w-full max-w-[494px] object-fill"
                  />
                  <div className="absolute left-3 top-4 flex flex-wrap items-center gap-[34px] pl-8">
                    {content.freeTrial.platforms.map((platformId) => {
                      const platform = serviceHeroContent.orderWidget.platforms.find(
                        (entry) => entry.id === platformId,
                      )
                      if (!platform) return null
                      return (
                        <PlatformIcon
                          key={platformId}
                          icon={platform.icon}
                          size={26}
                          spriteSrc={assets.socialIconsSprite}
                        />
                      )
                    })}
                  </div>
                  <ul className="absolute left-5 top-[65px] flex flex-col gap-3 text-sm font-medium leading-[1.35] text-[#404a60]">
                    {content.freeTrial.options.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={assets.giftBox}
              width={155}
              height={165}
              className="pointer-events-none absolute -left-28 top-24 hidden opacity-70 rotate-[34deg] lg:block"
            />
            <DashboardHomeCardTitle>{content.weeklyGift.title}</DashboardHomeCardTitle>
            <div className="relative mt-6 flex flex-col items-center gap-6">
              <div className="w-full text-base font-normal leading-[1.35] text-[#404a60]">
                <p>{content.weeklyGift.openedMessage}</p>
                <p>{content.weeklyGift.nextMessage}</p>
              </div>
              <DashboardHomeMutedRow className="flex w-full max-w-[494px] items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={assets.emailNotifyIcon}
                  width={20}
                  height={20}
                  className="size-5 shrink-0"
                />
                <span className="text-base font-normal leading-[1.35] text-[#979ca8]">
                  {content.weeklyGift.emailNotifyLabel}
                </span>
              </DashboardHomeMutedRow>
              <div className="flex flex-col items-center gap-[18px]">
                <p className="text-base font-normal leading-[1.35] text-[#222e48]">
                  {content.weeklyGift.countdownTitle}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <CountdownUnit value={content.weeklyGift.countdown.days} />
                  <span className="text-xl font-semibold text-[#21aeff]">:</span>
                  <CountdownUnit value={content.weeklyGift.countdown.hours} />
                  <span className="text-xl font-semibold text-[#21aeff]">:</span>
                  <CountdownUnit value={content.weeklyGift.countdown.minutes} />
                  <span className="text-xl font-semibold text-[#21aeff]">:</span>
                  <CountdownUnit value={content.weeklyGift.countdown.seconds} />
                </div>
              </div>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard>
            <DashboardHomeCardTitle>{content.affiliate.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base leading-[1.35] text-[#404a60]">
                {content.affiliate.introBefore}
                <span className="font-medium text-[#21aeff]">
                  {content.affiliate.brandHighlight}
                </span>
                {content.affiliate.introAfter}
              </p>
              <DashboardHomePrimaryButton
                href={content.affiliate.href}
                className="w-fit px-8"
              >
                {content.affiliate.ctaLabel}
              </DashboardHomePrimaryButton>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard>
            <DashboardHomeCardTitle>{content.settings.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-normal leading-[1.35] text-[#404a60]">
                {content.settings.description}
              </p>
              <ul className="flex w-full max-w-[494px] flex-col gap-3">
                {content.settings.items.map((item) => (
                  <li key={item.id}>
                    <LinkTo
                      href={item.href}
                      className="flex items-center justify-between rounded-xl border border-[#ebecef] bg-[#fafafb] p-3.5"
                    >
                      <span className="text-base font-medium leading-[1.35] text-[#343e56]">
                        {item.label}
                      </span>
                      <DashboardHomeLinkArrow src={assets.settingsArrow} />
                    </LinkTo>
                  </li>
                ))}
              </ul>
            </div>
          </DashboardHomeCard>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <DashboardHomeCard>
            <DashboardHomeCardTitle>{content.quickOrder.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-normal leading-[1.35] text-[#404a60]">
                {content.quickOrder.description}
              </p>
              <DashboardHomeCardDivider src={assets.cardDivider} />
              <ul className="flex w-full max-w-[494px] flex-col gap-3">
                {content.quickOrder.items.map((item) => (
                  <li key={item.id}>
                    <DashboardHomeGhostRow className="flex items-center justify-between border-[#ebecef] bg-[#f5f6f7]">
                      <div className="flex flex-col gap-2">
                        <span className="text-base font-medium leading-[1.35] text-[#202020]">
                          {item.title}
                        </span>
                        <span className="text-base font-medium leading-[1.35] text-[#888e9c]">
                          {item.price}
                        </span>
                      </div>
                      <DashboardHomeOutlineButton
                        href={item.href}
                        iconSrc={assets.orderNowIcon}
                        className="text-sm"
                      >
                        Order now
                      </DashboardHomeOutlineButton>
                    </DashboardHomeGhostRow>
                  </li>
                ))}
              </ul>
              <DashboardHomePrimaryButton
                href={content.quickOrder.newOrderHref}
                className="w-full"
              >
                {content.quickOrder.newOrderLabel}
              </DashboardHomePrimaryButton>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard>
            <DashboardHomeCardTitle>{content.suggestions.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-normal leading-[1.35] text-[#404a60]">
                {content.suggestions.description}
              </p>
              <DashboardHomeCardDivider src={assets.cardDivider} />
              <ul className="flex w-full max-w-[494px] flex-col gap-2">
                {content.suggestions.items.map((item) => (
                  <li key={item.id}>
                    <DashboardHomeMutedRow className="flex flex-col gap-4 px-3.5 py-3">
                      <div className="flex flex-col gap-2">
                        <p className="text-base font-semibold leading-[1.5] text-[#202020]">
                          {item.title}
                        </p>
                        <p className="text-sm font-normal leading-[1.3] text-[#343e56]">
                          {item.description}
                        </p>
                      </div>
                      <DashboardHomeTextLink
                        href={item.href}
                        arrowSrc={assets.linkArrow}
                      >
                        {item.actionLabel}
                      </DashboardHomeTextLink>
                    </DashboardHomeMutedRow>
                  </li>
                ))}
              </ul>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard>
            <DashboardHomeCardTitle>{content.help.title}</DashboardHomeCardTitle>
            <div className="mt-6 flex flex-col gap-6">
              <p className="text-base font-normal leading-[1.35] text-[#404a60]">
                {content.help.description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <DashboardHomeOutlineButton
                  href={content.help.faqHref}
                  className="h-[54px] flex-1 rounded-xl px-8"
                >
                  {content.help.faqLabel}
                </DashboardHomeOutlineButton>
                <DashboardHomePrimaryButton
                  href={content.help.contactHref}
                  className="flex-1"
                >
                  {content.help.contactLabel}
                </DashboardHomePrimaryButton>
              </div>
            </div>
          </DashboardHomeCard>

          <DashboardHomeCard>
            <DashboardHomeCardTitle>
              {content.featureRequest.title}
            </DashboardHomeCardTitle>
            <form
              className="mt-6 flex flex-col gap-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <p className="text-base font-normal leading-[1.35] text-[#404a60]">
                {content.featureRequest.description}
              </p>
              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder={content.featureRequest.placeholder}
                rows={4}
                className="w-full resize-y rounded-xl border border-[#dfe0e4] bg-white px-4 py-3 text-base font-normal leading-[1.35] text-[#222e48] placeholder:text-[#979ca8] outline-none focus-visible:border-[#21aeff] focus-visible:ring-2 focus-visible:ring-[#21aeff]/20"
              />
              <DashboardHomePrimaryButton type="submit" className="w-fit px-8">
                {content.featureRequest.submitLabel}
              </DashboardHomePrimaryButton>
            </form>
          </DashboardHomeCard>
        </div>
      </div>
    </div>
  )
}