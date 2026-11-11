import { landingHeroContent } from "@/data/landing/hero"
import { serviceHeroIntroByPlatform } from "@/data/service/hero-intros"
import type { ServiceHeroContent } from "@/types/service/hero"
import type { ServicesModalPlatformIcon } from "@/types/landing/services-modal"

const SERVICE_IMG = "/images/service"
const ORDER = SERVICE_IMG + "/order"

const serviceOrderSpriteSrc = ORDER + "/social-icons-sprite.png"

const serviceSpriteInstagram: ServicesModalPlatformIcon = {
  kind: "sprite",
  cropClassName:
    "absolute h-[639.76%] left-[-343.53%] max-w-none top-[-48.82%] w-[787.4%]",
}

const serviceSpriteTiktok: ServicesModalPlatformIcon = {
  kind: "sprite",
  cropClassName:
    "absolute h-[639.76%] left-[-195.87%] max-w-none top-[-196.09%] w-[787.4%]",
}

const serviceSpriteYoutube: ServicesModalPlatformIcon = {
  kind: "sprite",
  cropClassName:
    "absolute h-[639.76%] left-[-195.92%] max-w-none top-[-48.82%] w-[787.4%]",
}

const serviceSpriteFacebook: ServicesModalPlatformIcon = {
  kind: "sprite",
  cropClassName:
    "absolute h-[639.76%] left-[-48.43%] max-w-none top-[-48.82%] w-[787.4%]",
}

function platformOrderEntry(
  id: string,
  label: string,
  icon: ServicesModalPlatformIcon,
  usernamePlaceholder: string,
) {
  return { id, label, icon, usernamePlaceholder }
}

export const serviceHeroContent: ServiceHeroContent = {
  assets: {
    backgroundHero: landingHeroContent.assets.backgroundHero,
    orderDividerLine: SERVICE_IMG + "/order/divider-line.svg",
    secureLockIcon: SERVICE_IMG + "/order/secure-checkout-lock.svg",
    socialIconsSprite: serviceOrderSpriteSrc,
  },
  intro: {
    ...serviceHeroIntroByPlatform.instagram,
    trustCard: {
      paymentTitle: "Pay Securely With Your Preferred Method",
      paymentLogos: [
        {
          type: "brand",
          src: SERVICE_IMG + "/intro/pay-visa.png",
          className:
            "absolute h-[159.91%] left-[-7.58%] max-w-none top-[-27.56%] w-[111.74%]",
        },
        {
          type: "brand",
          src: SERVICE_IMG + "/intro/pay-mastercard.png",
          className:
            "absolute h-[168.91%] left-[-26.41%] max-w-none top-[-24.56%] w-[152.32%]",
        },
        {
          type: "brand",
          src: SERVICE_IMG + "/intro/pay-visa-electron.png",
          className:
            "absolute h-[159.61%] left-[-12.37%] max-w-none top-[-32.55%] w-[124.5%]",
        },
        {
          type: "brand",
          src: SERVICE_IMG + "/intro/pay-maestro.png",
          className:
            "absolute h-[165.58%] left-0 max-w-none top-[-34.68%] w-[99.98%]",
        },
        {
          type: "wallet",
          iconSrc: SERVICE_IMG + "/intro/pay-apple-icon.svg",
          label: "Pay",
        },
        {
          type: "wallet",
          iconSrc: SERVICE_IMG + "/intro/pay-google.png",
          label: "Pay",
          iconClassName:
            "absolute h-[178.29%] left-[-69.82%] max-w-none top-[-39.02%] w-[241.47%]",
        },
      ],
      backupTitle: "Backup If Counts Change",
      backupDescription:
        "If counts move after delivery, refill support helps keep the order covered for the package you chose.",
      backupIconSrc: SERVICE_IMG + "/intro/backup-shield.svg",
      dividerSrc: SERVICE_IMG + "/intro/trust-card-divider.svg",
    },
  },
  orderWidget: {
    defaultQualityId: "high-quality",
    qualityOptions: [
      { id: "high-quality", label: "High quality" },
      {
        id: "real-followers",
        label: "Real followers",
        recommendedBadge: "RECOMMENDED",
      },
    ],
    defaultPlatformId: "instagram",
    platforms: [
      platformOrderEntry(
        "instagram",
        "Instagram",
        serviceSpriteInstagram,
        "Enter your instagram username...",
      ),
      platformOrderEntry(
        "tiktok",
        "TikTok",
        serviceSpriteTiktok,
        "Enter your tiktok username...",
      ),
      platformOrderEntry(
        "youtube",
        "YouTube",
        serviceSpriteYoutube,
        "Enter your youtube channel...",
      ),
      platformOrderEntry(
        "facebook",
        "Facebook",
        serviceSpriteFacebook,
        "Enter your facebook page...",
      ),
      platformOrderEntry("twitter", "Twitter", {
        kind: "image",
        src: ORDER + "/platform-twitter.png",
        cropClassName:
          "absolute h-[115.84%] left-[-8.11%] max-w-none top-[-6.86%] w-[115.16%]",
      }, "Enter your twitter username..."),
      platformOrderEntry("threads", "Threads", {
        kind: "image",
        src: ORDER + "/platform-threads.png",
        cropClassName:
          "absolute h-[114.94%] left-[-7.72%] max-w-none top-[-2.3%] w-[112.52%]",
      }, "Enter your threads username..."),
      platformOrderEntry("spotify", "Spotify", {
        kind: "image",
        src: ORDER + "/platform-spotify.png",
        cropClassName:
          "absolute h-[110.43%] left-[-8.2%] max-w-none top-[-2.76%] w-[113.56%]",
      }, "Enter your spotify artist..."),
      platformOrderEntry("soundcloud", "Soundcloud", {
        kind: "image",
        src: ORDER + "/platform-soundcloud.png",
        cropClassName:
          "absolute h-[113.03%] left-[-8.88%] max-w-none top-[-5.31%] w-[115.98%]",
      }, "Enter your soundcloud profile..."),
    ],
    defaultPackageId: "pkg-100",
    packages: [
      {
        id: "pkg-100",
        quantity: 100,
        unitLabel: "Followers",
        price: "$4.99",
        compareAtPrice: "$12.74",
      },
      {
        id: "pkg-250-a",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-b",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-c",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-d",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        badge: "popular",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-e",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-f",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-g",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
      {
        id: "pkg-250-h",
        quantity: 250,
        saveLabel: "Save 13%",
        unitLabel: "Followers",
        badge: "max-value",
        price: "$9.99",
        compareAtPrice: "$18.50",
      },
    ],
    secureCheckoutLabel: "Guaranteed Safe & Secure Checkout",
  },
}
