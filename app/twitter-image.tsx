import { createSocialImage } from "@/lib/social-image"

export const alt = "Castlestone Technology — Custom software & AI for growing businesses"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function TwitterImage() {
  return createSocialImage()
}
