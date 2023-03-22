import { Image } from "./single/image.interface"
import { Questions } from "./single/questions.interface"
import { Seo } from "./single/seo.interface"


export interface BlogPage {
  id: number
  title_header: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: boolean
  seo: Seo
  question: Questions
  posts: Post[]
}

export interface Post {
  id: number
  title: string
  description: string
  date: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: boolean
  slug: any
  img: Image
}


