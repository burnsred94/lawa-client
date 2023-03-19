import { Service } from "./service-page.interface"
import { Case } from "./single/case.interface"
import { Image } from "./single/image.interface"
import { List } from "./single/list-result.interface"
import { Questions } from "./single/questions.interface"
import { Review } from "./single/review.interafaces"
import { Table } from "./single/table.interface"
import { SubServiceItem } from "./sub-service-item.interface"

export interface SubService {
  id: number
  title_header: string
  title: string
  description: string
  title_cases: string
  title_review: string
  createdAt: string
  updatedAt: string
  publishedAt: any
  descr_preview: string
  slug: string
  review_link: string
  cases_link: string
  sitemap_exclude: any
  preview_img: Image
  sub_service_items: SubServiceItem[]
  table: Table
  cases: Case[]
  reviews: Review[]
  list: List[]
  questions: Questions
  images: Image[]
  seo: any
  service: Service
}

