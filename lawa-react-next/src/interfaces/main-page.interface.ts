export interface MainPage {
    id: number
    title: string
    sub_title: string
    time_work: string
    title_services: string
    title_approach: string
    slogan: string
    title_trust: string
    title_form: string
    description_form: string
    title_qustions: string
    link_question: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    title_cases: string
    link_case: string
    title_review: string
    link_review: string
    header_image: HeaderImage
    services: Service[]
    approach_image: ApproachImage
    cases: Case[]
    approach_list: ApproachList[]
    reviews: Review[]
    trust_images: TrustImage[]
  }
  
  export interface HeaderImage {
    id: number
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
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
  
  export interface Formats {
    thumbnail: Thumbnail
  }
  
  export interface Thumbnail {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
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
    preview_img?: PreviewImg
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
  
  export interface ApproachImage {
    id: number
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats2
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
  
  export interface Formats2 {
    large: Large
    small: Small
    medium: Medium
    thumbnail: Thumbnail2
  }
  
  export interface Large {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
  }
  
  export interface Small {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
  }
  
  export interface Medium {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
  }
  
  export interface Thumbnail2 {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
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
  
  export interface ApproachList {
    id: number
    title: string
    description: string
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
  
  export interface TrustImage {
    id: number
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats?: Formats3
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
  
  export interface Formats3 {
    thumbnail: Thumbnail3
  }
  
  export interface Thumbnail3 {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
  }
  