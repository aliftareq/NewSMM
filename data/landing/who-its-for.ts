import type { WhoItsForSectionContent } from "@/types/landing/who-its-for"

const IMG = "/images/landing/who-its-for"

export const landingWhoItsForContent: WhoItsForSectionContent = {
  badgeLabel: "Who it’s for",
  headlineBefore: "Social Media Solutions for ",
  headlineHighlight: "Every Audience",
  description:
    "From content creators and influencers to growing businesses and marketing agencies, discover social media promotion services tailored to your goals across popular platforms.",
  assets: {
    cardDividerSrc: `${IMG}/card-divider.svg`,
    centerStepperSrc: `${IMG}/center-stepper.svg`,
    centerLogomarkSrc: `${IMG}/center-logomark.svg`,
  },
  audiencesLeft: [
    {
      id: "creators",
      title: "Content Creators & Influencers",
      titleClassName: "text-xl leading-[1.3]",
      description:
        "Discover services to support content visibility and audience engagement across popular social media platforms.",
      heroIconSrc: `${IMG}/audience-creators.png`,
      heroIconWidth: 33,
      heroIconHeight: 40,
      heroImageClassName:
        "absolute h-[151.26%] left-[-20%] top-[-8.21%] w-[140%] max-w-none",
      tags: [
        {
          id: "views",
          label: "Views",
          iconSrc: `${IMG}/metric-views.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute h-[123.38%] left-[-11.84%] top-[-12.99%] w-[125%] max-w-none",
        },
        {
          id: "followers",
          label: "Followers",
          iconSrc: `${IMG}/metric-followers.png`,
          iconWidth: 19,
          iconHeight: 20,
          imageClassName:
            "absolute h-[128.81%] left-[-20%] top-[-16.95%] w-[138.18%] max-w-none",
        },
        {
          id: "video-views",
          label: "Video views",
          iconSrc: `${IMG}/metric-video-views.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute h-[167.41%] left-[-35.34%] top-[-34.07%] w-[169.92%] max-w-none",
        },
        {
          id: "likes",
          label: "Likes",
          iconSrc: `${IMG}/metric-likes.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute left-[-24.68%] top-[-24.68%] size-[149.35%] max-w-none",
        },
      ],
    },
    {
      id: "musicians",
      title: "Musicians & Artists",
      titleClassName: "text-lg leading-normal",
      description:
        "Find services for promoting music, videos, and creative content across supported platforms.",
      heroIconSrc: `${IMG}/audience-musicians.png`,
      heroIconWidth: 31,
      heroIconHeight: 40,
      heroImageClassName:
        "absolute h-[126.67%] left-[-40%] top-[-15.56%] w-[162.86%] max-w-none",
      tags: [
        {
          id: "plays",
          label: "Plays",
          iconSrc: `${IMG}/metric-plays.svg`,
          iconWidth: 20,
          iconHeight: 20,
        },
        {
          id: "followers",
          label: "Followers",
          iconSrc: `${IMG}/metric-followers.png`,
          iconWidth: 19,
          iconHeight: 20,
          imageClassName:
            "absolute h-[128.81%] left-[-20%] top-[-16.95%] w-[138.18%] max-w-none",
        },
        {
          id: "comments",
          label: "Comments",
          iconSrc: `${IMG}/metric-comments.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute h-[153.66%] left-[-28.59%] top-[-25.94%] w-[157.18%] max-w-none",
        },
      ],
    },
  ],
  audiencesRight: [
    {
      id: "businesses",
      title: "Businesses & Brands",
      titleClassName: "text-xl leading-[1.3]",
      description:
        "Explore social media promotion services to complement your brand awareness and online marketing efforts.",
      heroIconSrc: `${IMG}/audience-businesses.png`,
      heroIconWidth: 49,
      heroIconHeight: 40,
      heroImageClassName:
        "absolute h-[139.68%] left-[-7.79%] top-[-19.05%] w-[114.29%] max-w-none",
      tags: [
        {
          id: "page-likes",
          label: "Page likes",
          iconSrc: `${IMG}/metric-likes.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute left-[-24.68%] top-[-24.68%] size-[149.35%] max-w-none",
        },
        {
          id: "followers",
          label: "Followers",
          iconSrc: `${IMG}/metric-followers.png`,
          iconWidth: 19,
          iconHeight: 20,
          imageClassName:
            "absolute h-[128.81%] left-[-20%] top-[-16.95%] w-[138.18%] max-w-none",
        },
        {
          id: "views",
          label: "Views",
          iconSrc: `${IMG}/metric-views.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute h-[123.38%] left-[-11.84%] top-[-12.99%] w-[125%] max-w-none",
        },
      ],
    },
    {
      id: "agencies",
      title: "Digital Marketing Agencies",
      titleClassName: "text-lg leading-normal",
      description:
        "Access a variety of social media services to support client campaigns and promotional projects.",
      heroIconSrc: `${IMG}/audience-agencies.png`,
      heroIconWidth: 58,
      heroIconHeight: 40,
      heroImageClassName:
        "absolute h-[117.95%] left-[-0.44%] top-[-7.69%] w-[100.88%] max-w-none",
      tags: [
        {
          id: "followers",
          label: "Followers",
          iconSrc: `${IMG}/metric-followers.png`,
          iconWidth: 19,
          iconHeight: 20,
          imageClassName:
            "absolute h-[128.81%] left-[-20%] top-[-16.95%] w-[138.18%] max-w-none",
        },
        {
          id: "views",
          label: "Views",
          iconSrc: `${IMG}/metric-views.png`,
          iconWidth: 20,
          iconHeight: 20,
          imageClassName:
            "absolute h-[123.38%] left-[-11.84%] top-[-12.99%] w-[125%] max-w-none",
        },
        {
          id: "subscribers",
          label: "Subscribers",
          iconSrc: `${IMG}/metric-subscribers.png`,
          iconWidth: 64,
          iconHeight: 19,
          imageClassName:
            "absolute h-[170.15%] left-0 top-[-29.85%] w-full max-w-none",
        },
      ],
    },
  ],
}
