import { Seo } from "./single/seo.interface"
import { Image } from "./single/image.interface"
import { Table } from "./single/table.interface"
import { Case } from "./single/case.interface"
import { Review } from "./single/review.interafaces"
import { SubService } from "./sub-service-page.interfaces"
import { Questions } from "./single/questions.interface"

export interface Service {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  title_service: any
  description: string
  title_cases: string
  cases_link: any
  title_review: any
  link_review: any
  slug: string
  sitemap_exclude: any
  preview_img: Image
  sub_services: SubService[]
  table_we_and_you: Table
  cases: Case[]
  reviews: Review[]
  seo: Seo
  images: Image[]
  questions: Questions
}





