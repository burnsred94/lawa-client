import { Image } from "./single/image.interface"

export interface PostPage {
    id: number
    title: string
    description: string
    date: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    sitemap_exclude: boolean
    slug: string
    description_preview: string
    img: Image
}