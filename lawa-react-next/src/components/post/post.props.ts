import { Post } from '@/interfaces/blog-page.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface PostProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: Post
}