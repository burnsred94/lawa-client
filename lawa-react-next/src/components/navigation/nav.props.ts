import { Post } from '@/interfaces/blog-page.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface NavProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>{
    keys: number[]
}