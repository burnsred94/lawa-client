import { Case } from "@/interfaces/single/case.interface"
import { Questions } from "@/interfaces/single/questions.interface"
import { Seo } from "@/interfaces/single/seo.interface"


export interface CasePage {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: boolean
  seo: Seo
  cases: Case[]
  questions: Questions
}

