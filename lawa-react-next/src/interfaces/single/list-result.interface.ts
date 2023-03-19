import { Image } from "./image.interface"

export interface ListResult {
    id: number
    description: string
    img: Image
  }

  export interface List {
    id: number
    title: string
    link: string
    description: string
    img: Image
  }