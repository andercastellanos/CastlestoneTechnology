import { createSocialImage } from "@/lib/social-image"

export const alt = "Castlestone Technology — Software a medida e IA para empresas en crecimiento"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  return createSocialImage("Software a medida e IA para empresas en crecimiento")
}
