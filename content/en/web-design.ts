import type { WebDesignContent } from "@/content/types/web-design"

export const webDesignContent: WebDesignContent = {
  path: "/services/web-design",
  metadata_title: "Web Design Services for Small Businesses",
  metadata_description: "Custom websites for small businesses, designed to load fast, rank on Google and turn visitors into calls and bookings. Free consultation and a written fixed-scope quote.",
  eyebrow: "Web design services",
  heading: "Web Design for Small Businesses",
  introduction: "We design and build custom websites for small and mid-sized businesses — fast, easy to find on Google, and built around what every website should do: turn visitors into calls, bookings and customers.",
  primaryCta: "Book a free consultation",
  secondaryCta: "See what's included",
  websites: {
    heading: "Websites Built Around Your Next Customer",
    introduction: "The starting point is your business: who visits your site, what they need to know, and the next step you want them to take.",
    items: [
      { title: "Business websites", description: "Service pages, contact paths and clear calls to action for professional services, health practices and local businesses." },
      { title: "Landing pages", description: "Focused pages for an ad campaign, a promotion or a new service, with tracking from click to lead." },
      { title: "Booking and inquiry sites", description: "Online booking, quote requests and inquiry forms that send leads straight to your inbox or the tools you already use." },
      { title: "Online stores", description: "Product catalogs, checkout and payments for businesses that sell online." },
      { title: "Website redesigns", description: "Rebuild a slow or outdated site, with planned redirects so existing pages and the search visibility you've earned carry over." },
    ],
  },
  included: {
    heading: "What Every Website Includes",
    items: [
      { title: "Custom design", description: "Designed around your brand and your customers, not a recycled template." },
      { title: "Mobile-first build", description: "Built to look and work right on phones, where most local searches happen." },
      { title: "Fast load times", description: "Modern code and hosting so pages load quickly." },
      { title: "SEO foundations", description: "Page titles, descriptions, structured data, a sitemap and Google Search Console setup from launch." },
      { title: "Analytics and lead tracking", description: "Google Analytics and conversion tracking so you can see where calls and form submissions come from." },
      { title: "Connections to your tools", description: "Booking calendars, CRMs, and email and text marketing." },
    ],
  },
  connected: {
    heading: "A Website That Works With the Rest of Your Business",
    description: [
      "Your website is usually the first thing a customer sees, but it shouldn't work alone. We can connect it to the services that turn visits into revenue: ",
      { text: "Local SEO", href: "/services/local-seo" },
      " to get found, an ",
      { text: "AI receptionist", href: "/services/ai-receptionist" },
      " to answer the calls your site generates, and ",
      { text: "SMS and email marketing", href: "/services/marketing-automation" },
      " to follow up with every lead.",
    ],
  },
  pricing: {
    heading: "How Pricing Works",
    introduction: "Every business needs something different, so we don't sell one-size packages. After a free consultation, you receive a written fixed-scope quote — what's included, the timeline and the price — before any work starts.",
    factorsHeading: "What shapes the quote",
    factors: [
      "The number of pages and the content each page needs",
      "Features such as booking or online payments",
      "Connections to tools your business already uses",
      "Content preparation and copywriting",
      "Your timeline",
    ],
    closing: [
      "Want a sense of typical market costs first? Read ",
      { text: "How much does a website cost?", href: "/blog/how-much-does-a-website-cost" },
    ],
  },
  process: {
    heading: "How We Work",
    steps: [
      { title: "Discovery call", description: "Discuss your business, your visitors, and what the website needs to do." },
      { title: "Written quote", description: "Review a fixed-scope quote before work starts." },
      { title: "Design", description: "Develop the design around the agreed pages and content." },
      { title: "Revisions", description: "Review the design and work through revisions before the build." },
      { title: "Build", description: "Build the website and the features included in the agreed scope." },
      { title: "Launch", description: "Bring the agreed website through to launch, with tracking and SEO foundations in place." },
    ],
  },
  cities: {
    heading: "Web Design by City",
    introduction: "We're based in Brickell, Miami, and work with businesses across Florida and the U.S.",
  },
  faq: {
    heading: "Questions About Web Design",
    items: [
      { question: "How long does it take to build a website?", answer: ["It depends on the number of pages, features and how ready your content is. Your written quote includes the timeline before any work starts."] },
      {
        question: "Do you use WordPress or Wix?",
        answer: [
          "We build custom websites with modern code instead of page-builder templates. Speed, flexibility and editing options depend on the implementation. If you're weighing the options, read ",
          { text: "WordPress vs. Wix vs. a custom website", href: "/blog/wordpress-vs-wix-vs-custom-website" },
          ".",
        ],
      },
      {
        question: "Will my website show up on Google?",
        answer: [
          "Every site launches with SEO foundations in place, but rankings take time and depend on your competition. For ongoing visibility, see our ",
          { text: "Local SEO service", href: "/services/local-seo" },
          ", or read ",
          { text: "How to make your website show up on Google", href: "/blog/how-to-make-your-website-show-up-on-google" },
          ".",
        ],
      },
      { question: "Can you redesign my current website?", answer: ["Yes. We review your existing pages and plan redirects so the pages and search visibility you already have carry over to the new site."] },
      { question: "What do you need from me to get started?", answer: ["A short description of your business and services, any logos or photos you have, and access to your current website or domain if you have one. Content preparation can be included in your quote."] },
    ],
  },
  final: {
    heading: "Let's Plan Your Website",
    description: "Tell us about your business and what you want your website to do. Start with a free consultation and a written fixed-scope quote.",
    contactLabel: "Contact our team",
  },
}
