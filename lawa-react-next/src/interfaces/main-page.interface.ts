import { Seo } from "./single/seo.interface"
import { Image } from "./single/image.interface"
import { Service } from "./service-page.interface"
import { ApproachList } from "./single/approach-list.interface"
import { Social } from "./single/soical.interfaces"
import { Case } from "./single/case.interface"
import { Review } from "./single/review.interafaces"
import { Questions } from "./single/questions.interface"
export interface MainPage {
  id: number
  title: string
  sub_title: string
  time_work: string
  title_services: string
  title_approach: string
  slogan: string
  title_trust: string
  title_form: string
  description_form: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  title_cases: string
  link_case: string
  title_review: string
  link_review: string
  sitemap_exclude: any
  header_image: Image
  services: Service[]
  approach_image: Image
  cases: Case[]
  approach_list: ApproachList[]
  reviews: Review[]
  trust_images: Image[]
  social: Social[]
  questions: Questions
  seo: Seo
}


