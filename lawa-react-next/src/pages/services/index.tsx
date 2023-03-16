import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, Headlines, Paragraph } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import { partners, resultFirst, resultLast, resultList, service, sphere } from '@/mock/mock.data'

import styles from './style.module.scss'
import axios from 'axios'
import { URL_SERVICE_PAGE } from '@/constants/constants'
import { ServicePage } from '@/interfaces/service-page.interface'
import { GetStaticPropsContext } from 'next'
import { useEffect } from 'react'


function Services (): JSX.Element {
  const route = useRouter()
  
  

  return (
    <>
      <main>
        <section className={styles.header}>
          <div className={styles.headerWrapper}>
            <Headlines tag='h1'>Наши услуги</Headlines>
          </div>
        </section>
        <section className={styles.breadCrumb}>
          <div className={styles.breadCrumbWrapper}>
            <Breadcrumbs data={[{ title: 'Услуги', path: route.asPath }]} />
          </div>
        </section>
        <section className={styles.service}>
          <div className={styles.serviceWrapper}>
            <div className={styles.serviceTitle}>
              <Headlines tag='h2'>Услуги</Headlines>
            </div>
            <div className={styles.serviceItems}>
              {service.map((item, key) => (
                <Service type='card' key={key} img={item.img} link={route.asPath + '/' + item.link}>{item.text}</Service>
              ))}
            </div>
            <div className={styles.serviceButton}>
              <Button>Смотреть все</Button>
            </div>
          </div>
        </section>
        <section className={styles.sphere}>
          <div className={styles.sphereWrapper}>
            <div className={styles.sphereTitle}>
              <Headlines tag="h2">Или выбери свою сферу</Headlines>
              <Button>Смотреть все предложения</Button>
            </div>
            <div className={styles.sphereBlock}>
              {sphere.map((value, key) => (
                <div key={key} className={styles.sphereBlockWrapper}>
                  <Link href={value.url}>
                    <div className={styles.sphereBlockItem}>
                      <Image
                        priority
                        width={90}
                        height={90}
                        src={value.img}
                        alt='img'
                      />
                    </div>
                    <Paragraph type="normal-text">{value.title}</Paragraph>
                  </Link>
                </div>
              ))

              }
            </div>
          </div>
        </section>
        <section className={styles.result}>
          <div className={styles.resultWrapper}>
            <div className={styles.resultImages}>
              <div className={styles.resultImagesLeft} />
              <div className={styles.resultImagesRight} />
            </div>
            <div className={styles.resultList}>
              <div className={styles.resultTitle}>
                <Headlines tag="h2">
                  Cокрушающий результат
                </Headlines>
              </div>
              <ul className={styles.resultListItems}>
                {resultList.map((item, key) => (
                  <li key={key}>
                    <Image priority alt="iconList" width={45} height={45} src={item.img} />
                    <Paragraph type="normal-text">{item.text}</Paragraph>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.process}>
          <div className={styles.processWrapper}>
            <div className={styles.processFirst}>
              <Headlines tag="h3">
                Делаем мы
              </Headlines>
              <ul className={styles.processFirstItems}>
                {resultFirst.map((listItem, key) => (
                  <li key={key}>{listItem.text}</li>
                ))}
              </ul>
            </div>
            <div className={styles.processNext}>
              <Image priority src='/svg/dobble_arrow_right.svg' width={183} height={227} alt='dobble arrow' />
            </div>
            <div className={styles.processLast}>
              <Headlines tag="h3">
                Получаете вы
              </Headlines>
              <ul className={styles.processLastItems}>
                {resultLast.map((listItem, key) => (
                  <li key={key}>{listItem.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.trust}>
          <div className={styles.trustWrapper}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>Нам доверяют</Headlines>
            </div>
          </div>
          <div className={styles.trustBlocks}>
            <button className={styles.trustButtonLeft}>
              <Image src='/svg/arrow-left.svg' alt='arrow' width={24} height={24} priority />
            </button>
            {
              partners.map((item, key) => (
                <div key={key} className={styles.trustImage}>
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                  />
                </div>
              ))
            }
            <button className={styles.trustButtonRight}>
              <Image src='/svg/arrow-right.svg' alt='arrow' width={24} height={24} priority />
            </button>
          </div>
        </section>
        <section className={styles.questions}>
          <div className={styles.questionsWrapper}>
            <div>
              <Headlines tag='h3'>Остались вопросы?</Headlines>
              <Button>Обсудить проект</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}


export default withLayout(Services)