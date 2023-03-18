export interface SubService {
    id: number
    title_header: string
    title: string
    description: string
    title_cases: string
    title_review: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    descr_preview: string
    slug: string
    review_link: any
    cases_link: string
    preview_img: PreviewImg
    table: Table
    cases: Case[]
    reviews: Review[]
    list: List[]
    questions: Questions
    images: Image2[]
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
  
  export interface Table {
    id: number
    We: We[]
    You: You[]
    title_we: string
    title_you: string
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
    logo: Logo
  }
  
  export interface Logo {
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
  
  export interface List {
    id: number
    title: string
    description: string
    link: any
  }
  
  export interface Questions {
    id: number
    title: string
    link: string
  }
  
  export interface Image2 {
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
  