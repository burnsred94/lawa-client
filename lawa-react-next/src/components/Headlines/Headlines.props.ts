import { ReactNode } from 'react'

export interface HeadlinesProps {
    children: ReactNode,
    tag: 'h1' | 'h2' | 'h3' | 'h4';
}