import { HtmlProps } from 'next/dist/shared/lib/html-context'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>{
    children: ReactNode,
    type: 'normal-text' | 'dull-text' | 'sub-title-text-normal' | 'sub-title-text-dull';
}