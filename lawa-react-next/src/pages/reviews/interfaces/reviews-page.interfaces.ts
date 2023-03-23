import { Review } from "@/interfaces/single/review.interafaces"
import { Seo } from "@/interfaces/single/seo.interface"

export interface ReviewPage {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: boolean
  reviews: Review[]
  seo: Seo
}





