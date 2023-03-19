import { Image } from "./image.interface"

export interface Case {
    id: number
    description: string
    link: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    sitemap_exclude: any
    image: Image
  }