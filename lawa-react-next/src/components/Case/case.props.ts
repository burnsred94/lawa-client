import { Case } from '@/interfaces/single/case.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface CaseProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>{
    data: Case
}