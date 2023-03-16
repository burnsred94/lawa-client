import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { DataBreadCrumbs } from './interfaces/interfaces'

export interface BreadCrumbsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: DataBreadCrumbs[]
}

