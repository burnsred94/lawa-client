import { Questions } from "./single/questions.interface"
import { Seo } from "./single/seo.interface"

export interface ContactPage {
    id: number
    title: string
    contacts: Contact[]
    createdAt: string
    updatedAt: string
    publishedAt: string
    sitemap_exclude: boolean
    seo: Seo
    question: Questions
}

export interface Contact {
    title: string
    address?: string
    phones?: Phone[]
    email?: string
}

export interface Phone {
    phone: string
    title: string
}
