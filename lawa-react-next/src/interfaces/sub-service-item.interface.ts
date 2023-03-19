import { ApproachList } from "./single/approach-list.interface";
import { Image } from "./single/image.interface";
import { Case } from "./single/case.interface";
import { Review } from "./single/review.interafaces";
import { Table } from "./single/table.interface";
import { Seo } from "./single/seo.interface";
import { SubService } from "./sub-service-page.interfaces";
import { Service } from "./service-page.interface";

export interface SubServiceItem {
    id: number
    title: string
    description: string
    decsription_preview: string
    questions: string
    question_link: string
    createdAt: string
    updatedAt: string
    publishedAt: any
    slug: string
    review_link: string
    cases_link: string
    sitemap_exclude: boolean
    images: Image[]
    arsenal: ApproachList[]
    we_and_you: Table
    cases: Case[]
    reviews: Review[]
    seo: Seo
    sub_service: SubService
    image_preview: Image
    service: Service
  }

  

 