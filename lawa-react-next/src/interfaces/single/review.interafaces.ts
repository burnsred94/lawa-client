import { Image } from "./image.interface"
import { Seo } from "./seo.interface"

export interface Review {
  id: number
  description: string
  name: string
  post: string
  link: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: any
  logo: Image
  seo: Seo
  photo: Image[]
}