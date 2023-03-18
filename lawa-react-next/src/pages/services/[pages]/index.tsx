import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { Button, Headlines, Paragraph } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import { cases, dataPages, resultFirst, resultLast, reviews } from '@/mock/mock.data'

import styles from './style.module.scss'
import axios from 'axios'
import { URL_SERVICE_PAGE } from '@/constants/constants'
import { Service as ServiceItem} from '@/interfaces/service-page.interface'

 function Page  ({ ...props }): JSX.Element {
  const route = useRouter()
  const [activeReview, setActiveReview] = useState()
  const [active, setActive] = useState(0)
  const [dataPage , setDataPage] = useState<ServiceItem>()
  const data = dataPages.find((item) => item.slug === (route.asPath.split('/').pop()))


  useEffect (()=> {
    async function fetchData () {
      try {
        const {data} = await axios.get<ServiceItem>(process.env.NEXT_PUBLIC_DOMAIN + URL_SERVICE_PAGE + route.asPath.split('/').pop());
          setDataPage(data)
      }catch (e) {
        console.log(e)
      }
    }
    fetchData()
  },[route.query])

  
  return (
    <>
      <main>
        <section className={styles.header}>
          <div className={styles.headerWrapper}>
            <Headlines tag='h1'>{dataPage && dataPage.title}</Headlines>
          </div>
        </section>
        <section className={styles.breadCrumb}>
          <div className={styles.breadCrumbWrapper}>
            <Breadcrumbs data={[{ title: 'Услуги', path: '/' + route.asPath.split('/').splice(0, 2).join('') }, { title: data !== undefined ? data?.title : '', path: route.asPath }]} />
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
                  {dataPage && dataPage.title}
                </Headlines>
              </div>
              <div className={styles.resultList}>
                <Paragraph type='normal-text'>
                  {dataPage && dataPage?.description}
                </Paragraph>
                <Button>Заказать услугу</Button>
              </div>
            </div>
          </div>
        </section>
        <section className={cn(styles.specifics, {
          [styles.specificsGridTheere]: data?.all_research.length !== undefined && data?.all_research.length < 4,
          [styles.specificsGridAdaptive]: data?.all_research.length !== undefined && data?.all_research.length % 2 !== 0,
        })}>
          {
            dataPage && dataPage.sub_services.map((item, key) => (
              <Service key={key} type='specific-card' 
                link={route.query.pages + '/' + item.slug} 
                img={item.preview_img?.url} 
                text={item.title}>{item.descr_preview}</Service>
            ))
          }
        </section>
        <section className={styles.process}>
          <div className={styles.processWrapper}>
            <div className={styles.processFirst}>
              <Headlines tag="h3">
                Делаем мы
              </Headlines>
              <ul className={styles.processFirstItems}>
                {dataPage?.table_we_and_you.We.map((listItem, key) => (
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
                {dataPage?.table_we_and_you.You.map((listItem, key) => (
                  <li key={key}>{listItem.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.cases}>
          <div className={styles.casesTitle}>
            <Headlines tag='h2'>Наши Кейсы</Headlines>
            <Button>Смотреть все работы</Button>
          </div>
          <div className={styles.casesCards}>
            {dataPage?.cases.map((item, key) => (
              <div key={key} className={cn(styles.casesDefualt, {
                [styles.casesActive]: key === active,
                [styles.casesNonActive]: key !== active
              })}>
                <Service type='card-partners'  img={item.image.url} link={item.link}>{item.description}</Service>
              </div>
            ))}
          </div>
          <div className={styles.casesSlider}>
            {cases.slice(0, 3).map((item, key) => (
              <button
                className={cn(styles.casesButtonSlider, {
                  [styles.casesButtonSliderActive]: key === active
                })}
                key={key}
                onClick={() => setActive(key)}
              />
            ))}
          </div>
        </section>
        <section className={styles.cases}>
          <div className={styles.casesTitle}>
            <Headlines tag='h2'>{dataPage?.title_review}</Headlines>
            <Button>Смотреть все Отзывы</Button>
          </div>
          <div className={styles.reviewCards}>
            {dataPage?.reviews.map((item, key) => (
              <div key={key} className={cn(styles.casesDefualt, {
                [styles.casesActive]: key === activeReview,
                [styles.casesNonActive]: key !== activeReview
              })}>
                <Service type='card-review' img={item.logo.url} title={item.post} text={item.description} client_name={item.name} />
              </div>
            ))}
          </div>
          <div className={styles.casesSlider}>
            {cases.slice(0, 3).map((item, key) => (
              <button
                className={cn(styles.buttonSliderBlock, {
                  [styles.buttonSliderBlockActive]: key === active
                })}
                key={key}
                onClick={() => setActive(key)}
              />
            ))}
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




export default withLayout(Page)