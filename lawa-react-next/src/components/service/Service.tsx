/* eslint-disable @next/next/no-img-element */
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Paragraph } from '../Paragraph/Paragraph'
import { ServiceProps } from './Service.props'
import styles from './style.module.scss'



export const Service = ({ type, children, link, img, text, client_name, title }: ServiceProps): JSX.Element => {

  const [activeText, setActiveText] = useState(false)



  switch (type) {
    case 'card':
      return (
        <Link href={link ? link : '#'}>
          <div className={styles.service}>
            <div className={styles.serviceArrow}>
              <Image
                priority
                src="/arrow45deg.svg"
                width={25}
                height={25}
                alt="arrow"
              />
            </div>
            <div className={styles.serviceText}>
              {img ? <Image
                priority
                loader={() => loaderImage(img.url)}
                src={process.env.NEXT_PUBLIC_API_URL + img.url}
                width={48}
                height={48}
                alt="arrow"
              /> : "Not image preview"}
              <Paragraph type='normal-text'>{typeof children === 'string' ? children : 'Not description preview'}</Paragraph>
            </div>
          </div>
        </Link>
      )
    case 'card-partners':
      return (
        <div className={styles.partners}>
          <div className={styles.partnersCard}>
            <div className={styles.partnersImage}>
              {img ? <Image
                loader={() => loaderImage(img.url)}
                src={process.env.NEXT_PUBLIC_API_URL + img.url}
                width={img.width}
                height={img.height}
                alt="arrow"
              /> : "Not image preview"}
            </div>
          </div>
          <div className={cn({
            [styles.partnersOpen]: activeText === true,
            [styles.partnersText]: activeText === false
          })}>
            <Paragraph type='normal-text'>{children}</Paragraph>
          </div>
          <div className={styles.partnersLink}>
            <Link href={`/cases/${link}`} onClick={() => setActiveText(true)}>Подробнее
              <Image
                src='/arrowright.svg'
                width={24}
                height={24}
                alt='arrow right'
              />
            </Link>
          </div>
          <span className={styles.partnersLine}></span>
        </div>
      )
    case 'card-review':
      return (
        <div className={styles.reviewBlock}>
          <div className={styles.reviewBlockText}>
            <Paragraph type='normal-text'>{text}</Paragraph>
          </div>
          <Link className={styles.reviewButton} href={`/reviews/${link}`}>
            Читать все
            <Image
              priority
              src='/arrowdown.svg'
              width={30}
              height={30}
              alt="arrow"
            />
          </Link>
          <div className={styles.reviewCredential}>
            {img ? <Image
              priority
              loader={() => loaderImage(img.url)}
              src={process.env.NEXT_PUBLIC_API_URL + img.url}
              width={90}
              height={90}
              alt="client"
            /> : "Not image preview"}
            <div className={styles.reviewData}>
              <span>{title}</span>
              <span>{client_name}</span>
            </div>
          </div>
        </div>
      )
    case 'specific-card':
      return (
        <div className={styles.specific}>

          <Link href={`${link}`}>
            <div className={styles.specificImage}>
              {img ? <Image priority loader={() => loaderImage(img.url)} src={process.env.NEXT_PUBLIC_DOMAIN + img.url} width={56} height={56} alt='image specific' /> : "Not load image"}
              <Paragraph type='normal-text'>{text}</Paragraph>
            </div>
            <div className={styles.specificDescription}>
              <Paragraph type='sub-title-text-dull' >{typeof children === 'string' ? children : 'Not description preview'}</Paragraph>
            </div>
            <div className={styles.specificLink}>
              <Link href={`${link}`} onClick={() => setActiveText(true)}>Подробнее
                <Image
                  src='/svg/left_tang.svg'
                  width={24}
                  height={24}
                  alt='arrow right'
                />
              </Link>
            </div>
          </Link>

        </div>
      )
    case 'arsenal-card':
      return (
        <div className={styles.arsenal}>
          {img !== null ? <Image priority loader={() => loaderImage(img.url)} src={process.env.NEXT_PUBLIC_DOMAIN + img.url} width={48} height={48} alt='arsenal icon' /> : "Not load image"}
          <Paragraph type='normal-text'>{children}</Paragraph>
          <Paragraph type='sub-title-text-normal'>{text}</Paragraph>
        </div>
      )
    case 'executives-card':
      return (
        <div className={styles.executives}>
          <div className={styles.executivesImage}>
            {img ? <Image priority loader={() => loaderImage(img.url)} src={process.env.NEXT_PUBLIC_DOMAIN + img.url} width={380} height={370} alt='image specific' /> : "Not load image"}

          </div>
          <div className={styles.executivesText}>
            <span>{children}</span>
            <span>{text}</span>
          </div>
        </div>
      )

    default:
      return <>None type</>
  }
}