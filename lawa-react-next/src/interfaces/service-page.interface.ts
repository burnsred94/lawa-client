export interface Service {
    id: number
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    title_service: any
    description: string
    link_service: any
    title_cases: string
    cases_link: any
    title_review: any
    link_review: any
    slug: string
    preview_img: PreviewImg
    sub_services: SubService[]
    table_we_and_you: TableWeAndYou
    cases: Case[]
    reviews: Review[]
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
  
  export interface SubService {
    id: number
    title_header: string
    title: string
    description: string
    title_cases?: string
    title_review?: string
    createdAt: string
    updatedAt: string
    publishedAt?: string
    descr_preview: any
    slug: any
    review_link: any
    cases_link: any
    preview_img: any
  }
  
  export interface TableWeAndYou {
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
  
  export interface Case {
    id: number
    description: string
    link: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    image: Image
  }
  
  export interface Image {
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
  
  export interface Review {
    id: number
    description: string
    name: string
    post: string
    link: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    logo: any
  }
  