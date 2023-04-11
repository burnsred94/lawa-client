

import { Image } from '@/interfaces/single/image.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: Image[] | null
}