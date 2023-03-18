
export interface ServicesPage {
  id: number
  title: string
  title_services: string
  title_sphere: string
  link_sphere: string
  title_results: string
  title_images: string
  title_question: string
  link_question: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  services: Service[]
  spheres: Sphere[]
  images_result: any
  list_result: ListResult[]
  table: Table
  trust_images: TrustImage[]
}

export interface Service {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  title_service: any
  description: string
  link_service?: string
  title_cases?: string
  cases_link?: string
  title_review?: string
  link_review?: string
  slug: string
  preview_img: PreviewImg
}

export interface PreviewImg {
  id: number
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  folderPath: string
  createdAt: string
  updatedAt: string
}

export interface Sphere {
  id: number
  title: string
  img: Img
}

export interface Img {
  id: number
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  folderPath: string
  createdAt: string
  updatedAt: string
}

export interface ListResult {
  id: number
  description: string
  img: Img2
}

export interface Img2 {
  id: number
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  folderPath: string
  createdAt: string
  updatedAt: string
}

export interface Table {
  id: number
  We: We[]
  You: You[]
  title_we: string
  title_you: string
  img: any
}

export interface We {
  text: string
}

export interface You {
  text: string
}

export interface TrustImage {
  id: number
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  folderPath: string
  createdAt: string
  updatedAt: string
}
