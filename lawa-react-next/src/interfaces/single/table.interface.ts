import { Image } from './image.interface'

export interface Table {
    id: number
    We: We[]
    You: You[]
    title_we: string
    title_you: string
    img: Image
  }
  
  export interface We {
    text: string
  }
  
  export interface You {
    text: string
  }