import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { Image } from '@/interfaces/single/image.interface';


export interface ServiceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    children?: ReactNode;
    client_name?: string;
    img: Image ;
    link?: string;
    text?: string;
    type: 'card' | 'card-partners' | 'card-review' | 'specific-card' | 'arsenal-card' | 'executives-card';
}