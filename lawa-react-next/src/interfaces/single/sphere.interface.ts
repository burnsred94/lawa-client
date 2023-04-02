import { Service } from "../service-page.interface"
import { Case } from "./case.interface"
import { Image } from "./image.interface"
import { Questions } from "./questions.interface"
import { Review } from "./review.interafaces"
import { Seo } from "./seo.interface"
import { Table } from "./table.interface"

export interface SphereItem {
  id: number
  title: string
  img: Image
  sphere: Sphere
}


export interface Sphere {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: boolean
  slug: string
  description: string
  case_title: string
  case_link: string
  review_title: string
  review_link: string
  images: Image[]
  we_and_you: Table
  question: Questions
  services: Service[]
  cases: Case[]
  reviews: Review[]
  seo: Seo
}