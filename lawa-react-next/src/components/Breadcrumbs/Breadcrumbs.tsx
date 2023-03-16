import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { BreadCrumbsProps } from './Breadcrumbs.props'
import styles from './style.module.scss'


export const Breadcrumbs = ({ data }: BreadCrumbsProps): JSX.Element => {



  return (
    <div className={styles.breadCrumbs}>
      <div>
        <Link href='/'>
          Главная
        </Link>
      </div>

      {data.map((link, key) => (
        <div key={key} className={cn({
          [styles.active]: data.length === (key + 1)
        })}>
          <Image
            priority
            src='/svg/breadCrumbsArrow.svg'
            width={24}
            height={24}
            alt='Arrow'
          />
          <Link href={link.path}>{link.title}</Link>
        </div>
      ))}
    </div>
  )
}