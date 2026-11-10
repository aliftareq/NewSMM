"use client"

import { FollowerComparisonGlanceTable } from "@/components/shared/service/follower-comparison/follower-comparison-glance-table"
import { FollowerComparisonTierCardView } from "@/components/shared/service/follower-comparison/follower-comparison-tier-card"
import { AnimatedContent } from "@/components/shared/animated-content"
import { landingScrollRevealProps } from "@/components/shared/landing/landing-section-heading-reveal"
import type { FollowerComparisonData } from "@/types/service/follower-comparison"

type ServiceFollowerComparisonBodyProps = {
  tierCards: FollowerComparisonData["tierCards"]
  glance: FollowerComparisonData["glance"]
  assets: FollowerComparisonData["assets"]
}

export function ServiceFollowerComparisonBody({
  tierCards,
  glance,
  assets,
}: ServiceFollowerComparisonBodyProps) {
  return (
    <div className="flex w-full min-w-0 max-w-[1320px] flex-col gap-5">
      <AnimatedContent
        {...landingScrollRevealProps}
        stagger={0.1}
        className="grid grid-cols-1 gap-[18px] lg:grid-cols-2"
      >
        {tierCards.map((card) => (
          <FollowerComparisonTierCardView
            key={card.id}
            card={card}
            checkBlueIcon={assets.checkBlueIcon}
            instagramSprite={assets.instagramIconSprite}
            instagramCropClassName={assets.instagramIconCropClassName}
          />
        ))}
      </AnimatedContent>

      <AnimatedContent
        {...landingScrollRevealProps}
        delay={0.05}
        className="w-full min-w-0"
      >
        <FollowerComparisonGlanceTable
          title={glance.title}
          highQualityColumn={glance.highQualityColumn}
          realFollowersColumn={glance.realFollowersColumn}
          rows={glance.rows}
          checkGreenIcon={assets.checkGreenIcon}
          crossRedIcon={assets.crossRedIcon}
        />
      </AnimatedContent>
    </div>
  )
}
