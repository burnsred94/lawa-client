import Image from 'next/image'
import Link from 'next/link'

import { Paragraph } from '@/components'

import { FooterProps } from './Footer.props'
import styles from './style.module.scss'



export const Footer = ({ ...props }: FooterProps): JSX.Element => {
  const date = new Date



  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerWrapperLogo}>
          <Image src='/svg/logo.svg' width={130} height={30} alt='logo' />
        </div>
        <ul className={styles.footerWrapperNavigation}>
          <li className={styles.footerWrapperNavigationItem}>
            <Link href='/services'>Услуги</Link>
          </li>
          <li className={styles.footerWrapperNavigationItem}>
            <Link href='/cases'>Кейсы</Link>
          </li>
          <li className={styles.footerWrapperNavigationItem}>
            <Link href='/about'>О Нас</Link>
          </li>
          <li className={styles.footerWrapperNavigationItem}>
            <Link href='/blog'>Блог</Link>
          </li>
          <li className={styles.footerWrapperNavigationItem}>
            <Link href='/reviews'>Отзывы</Link>
          </li>
          <li className={styles.footerWrapperNavigationItem}>
            <Link href='/contacts'>Контакты</Link>
          </li>
        </ul>
        <div className={styles.footerWrapperCopyright}>
          <Paragraph type='sub-title-text-dull'>{`© ${date.getFullYear()} Все права защищены`}</Paragraph>
        </div>
      </div>
    </footer>
  )
}