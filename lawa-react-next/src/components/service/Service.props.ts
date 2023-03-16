import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'


export interface ServiceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    children?: ReactNode;
    client_name?: string;
    img: string;
    link?: string;
    text?: string;
    type: 'card' | 'card-partners' | 'card-review' | 'specific-card' | 'arsenal-card' | 'executives-card';
}