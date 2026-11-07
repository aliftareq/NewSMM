import { blogPageContent } from "@/data/blog/blog"
import type { ContactPageContent } from "@/types/contact/contact"

const CONTACT_IMG = "/images/pages/contact"

export const contactPageContent: ContactPageContent = {
  breadcrumb: {
    homeLabel: "Home",
    currentLabel: "Contact Us",
  },
  hero: {
    badgeLabel: "Contact Us",
    title: "Need Help?",
    titleHighlight: "Contact Us",
    description:
      "Have a question or need support? Reach out to our team for assistance and a smoother experience with our services.",
  },
  form: {
    submitLabel: "Submit Now",
    fields: [
      {
        id: "firstName",
        label: "First Name",
        placeholder: "first name",
        type: "text",
      },
      {
        id: "lastName",
        label: "Last Name",
        placeholder: "last name",
        type: "text",
      },
      {
        id: "whatsapp",
        label: "Whatsapp Number",
        placeholder: "enter your number",
        type: "text",
      },
      {
        id: "message",
        label: "Message",
        placeholder: "I'd love to learn more about your services",
        type: "textarea",
      },
    ],
  },
  supportChannels: [
    {
      id: "phone",
      title: "Phone Support",
      value: "+880******************",
      href: "tel:+8800000000000",
      description: "Send us a message on WhatsApp for prompt assistance.",
      iconSrc: `${CONTACT_IMG}/phone-icon.png`,
    },
    {
      id: "email",
      title: "Email Address",
      value: "example@gmail.com",
      href: "mailto:example@gmail.com",
      description:
        "Our team is committed to providing timely and helpful responses.",
      iconSrc: `${CONTACT_IMG}/email-icon.png`,
    },
  ],
  assets: {
    breadcrumbChevronSrc: blogPageContent.assets.breadcrumbChevronSrc,
    heroBackgroundSrc: blogPageContent.assets.heroBackgroundSrc,
    supportPhotoSrc: `${CONTACT_IMG}/support-photo.png`,
    submitArrowSrc: `${CONTACT_IMG}/submit-arrow.svg`,
  },
}
