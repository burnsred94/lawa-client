import { Image } from "./image.interface"
import { Seo } from "./seo.interface"

export interface Case {
  id: number
  description: string
  description_preview: string
  slider_images: Image[]
  seo: Seo
  link: string
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: any
  image: Image
}