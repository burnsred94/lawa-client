import { Service } from './service-page.interface'
import { Image } from './single/image.interface'
import { ListResult } from './single/list-result.interface'
import { Seo } from './single/seo.interface'
import { Sphere } from './single/sphere.interface'
import { Table } from './single/table.interface'

export interface ServicesPage {
  id: number
  title: string
  title_services: string
  title_sphere: string
  link_sphere: string
  title_results: string
  title_images: string
  title_question: string
  link_question: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  sitemap_exclude: any
  services: Service[]
  spheres: Sphere[]
  images_result: Image[]
  list_result: ListResult[]
  table: Table
  trust_images: Image[]
  sub_description: string;
  seo: Seo
}
