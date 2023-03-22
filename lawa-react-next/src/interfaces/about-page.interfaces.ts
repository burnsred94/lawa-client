import { DataContact } from "./single/data-contacts.interface"
import { Executions } from "./single/executions.interfaces"
import { Image } from "./single/image.interface"
import { Questions } from "./single/questions.interface"
import { Seo } from "./single/seo.interface"


export interface AboutPage {
  id: number
  title_header: string
  title: string
  description: string
  link: string
  title_director: string
  description_director: DescriptionDirector[]
  title_executives: string
  title_contacts: string
  data_contacts: DataContact[]
  createdAt: string
  updatedAt: string
  publishedAt: any
  sitemap_exclude: boolean
  images: Image[]
  image_director: Image
  executives: Executions[]
  questions: Questions
  seo: Seo
}

export interface DescriptionDirector {
  text?: string
  title?: string
  slug?: string
}








