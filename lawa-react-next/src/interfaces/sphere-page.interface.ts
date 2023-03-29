import { Service } from "./service-page.interface"
import { Table } from "./single/table.interface"
import { Image } from "./single/image.interface"
import { Case } from "./single/case.interface"
import { Review } from "./single/review.interafaces"
import { Questions } from "./single/questions.interface"
import { Seo } from "./single/seo.interface"


export interface SpherePage {
    id: number
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    sitemap_exclude: boolean
    description: string
    title_cases: string
    link_cases: string
    review_title: string
    review_link: string
    images_header: Image[]
    services: Service[]
    we_and_you: Table
    cases: Case[]
    reviews: Review[]
    question: Questions
    seo: Seo
}

