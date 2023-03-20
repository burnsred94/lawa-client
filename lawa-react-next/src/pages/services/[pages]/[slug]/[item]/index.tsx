import { withLayout } from "@/layout/layout"
import { AssetService } from "@/services/AssetService"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SubServiceItem } from "../../../../../interfaces/sub-service-item.interface"
import { NextSeo } from "next-seo"
import { URL_SUB_SERVICES_ITEM_PAGE } from "@/constants/constants"
import { Button, Headlines } from "@/components"
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs"
import  Image from "next/image"
import axios from "axios"
import cn from "classnames"

import styles from "./style.module.scss"
import { Service } from "@/components/service/Service"
import { reviews } from "@/mock/mock.data"


function SubServiceItem ({...props}): JSX.Element {
    const route = useRouter()
    const [activeReview, setActiveReview] = useState()
    const [active, setActive] = useState(0)
    const [data, setData] = useState<SubServiceItem>()
  
    const link = `https://lawa.by${route.asPath}`
    const canonicalLink = link.includes('?') ? link.substring(0, link.indexOf('?')) : link
    const assetService = new AssetService({ assetsBase: process.env.NEXT_PUBLIC_DOMAIN as string })
  
  
    useEffect(() => {
      async function fetchData() {
        try {
          if (route.query.slug) {
            const { data } = await axios.get<SubServiceItem>(process.env.NEXT_PUBLIC_DOMAIN + URL_SUB_SERVICES_ITEM_PAGE + route.query.item);
            setData(data)
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetchData()
    }, [route.query])
  
    console.log(route.query)
  
    return (
      <>
        <>
          {data?.seo !== null ?
            <NextSeo
              title={data?.seo.title}
              description={data?.seo.description}
              canonical={canonicalLink}
              openGraph={{
                url: canonicalLink,
                title: data?.seo.title,
                description: data?.seo.description,
                images: [{
                  url: `${assetService.permalink(`${data?.seo.image.url as string || ''}`, 'asset')}`,
                  width: data?.seo.image.width || 2400,
                  height: data?.seo.image.height || 1252,
                  alt: 'Lawa',
                  type: data?.seo.image.mime || 'image/jpeg',
                }],
              }}
  
            /> : null}
        </>
        <main>
          {data?.title !== null ? 
          
          <section className={styles.header}>
            <div className={styles.headerWrapper}>
              <Headlines tag='h1'>{data?.title}</Headlines>
            </div>
          </section>: 
          
          null}
  
          {data?.sub_service.title !== null && data?.sub_service.slug !== null ?
  
          <section className={styles.breadCrumb}>
            <div className={styles.breadCrumbWrapper}>
              <Breadcrumbs data={[
                { title: 'Услуги', path: '/' + route.asPath.split('/').splice(0, 2).join('') },
                { title: data?.service.title as string, path: '/' + route.asPath.split('/').splice(0, 2).join('') + '/' + data?.service.slug},
                {
                  title: data?.sub_service.title !== undefined ? data?.sub_service.title : '', path: '/' + 
                  route.asPath.split('/').splice(0, 2).join('') + '/' + data?.service.slug + '/' + data?.sub_service.slug,
                },
                { title: data?.title !== undefined ? data?.title : '', path: route.asPath }
              ]} />
            </div>
          </section>: 
          
          null}
  
          {data?.title !== null ? 
  
          <section className={styles.result}>
            <div className={styles.resultWrapper}>
              <div className={styles.resultImages}>
                <div className={styles.resultImagesLeft} />
                <div className={styles.resultImagesRight} />
              </div>
              <div className={styles.resultList}>
                <div className={styles.resultTitle}>
                  <Headlines tag="h2">
                    {data?.title}
                  </Headlines>
                </div>
                <div className={styles.resultList}>
                  <div className={styles.resultDescription} dangerouslySetInnerHTML={{ __html: typeof data?.description === 'string' ? data?.description : '' }}>
                  </div>
                  <Button>Заказать услугу</Button>
                </div>
              </div>
            </div>
          </section>:
  
            null}
  
          {data?.arsenal !== null ? 
          
          <section className={styles.specifics}>
            <div className={styles.specificsTitle}>
              <Headlines tag='h2' >Наш Арсенал</Headlines>
            </div>
            <div className={styles.specificsArsenal}>
              {data && data.arsenal.map((item, key) => (
                <div key={key} className={styles.specificsArsenalItem}>
                  <Service type='arsenal-card' text={item.description} img={item.img.url}>{item.title}</Service>
                </div>
              ))}
            </div>
          </section>: 
          
          null }
  
          {data?.we_and_you !== null ? 
          
          <section className={styles.process}>
            <div className={styles.processWrapper}>
              <div className={styles.processFirst}>
                <Headlines tag="h3">
                  {data?.we_and_you.title_we}
                </Headlines>
                <ul className={styles.processFirstItems}>
                  {data?.we_and_you.We.map((listItem, key) => (
                    <li key={key}>{listItem.text}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.processNext}>
                <Image priority src='/svg/dobble_arrow_right.svg' width={183} height={227} alt='dobble arrow' />
              </div>
              <div className={styles.processLast}>
                <Headlines tag="h3">
                  {data?.we_and_you.title_you}
                </Headlines>
                <ul className={styles.processLastItems}>
                  {data?.we_and_you.You.map((listItem, key) => (
                    <li key={key}>{listItem.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>: 
          
          null}
  
          {data?.cases !== null ? 
          
          <section className={styles.cases}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>Наши Кейсы</Headlines>
              <Button>Смотреть все работы</Button>
            </div>
            <div className={styles.casesCards}>
              {data?.cases.map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === active,
                  [styles.casesNonActive]: key !== active
                })}>
                  <Service type='card-partners' img={item.image.url} link={item.link}>{item.description}</Service>
                </div>
              ))}
            </div>
            <div className={styles.casesSlider}>
              {data?.cases.slice(0, 3).map((item, key) => (
                <button
                  className={cn(styles.casesButtonSlider, {
                    [styles.casesButtonSliderActive]: key === active
                  })}
                  key={key}
                  onClick={() => setActive(key)}
                />
              ))}
            </div>
          </section>: 
          null}
  
          {data?.reviews !== null ? 
          
          <section className={styles.cases}>
          <div className={styles.casesTitle}>
            <Headlines tag='h2'>Отзывы</Headlines>
            <Button>Смотреть все Отзывы</Button>
          </div>
          <div className={styles.reviewCards}>
            {data?.reviews.map((item, key) => (
              <div key={key} className={cn(styles.casesDefualt, {
                [styles.casesActive]: key === active,
                [styles.casesNonActive]: key !== active
              })}>
                <Service type='card-review' img={item.logo.url} title={item.post} text={item.description} client_name={item.name} />
              </div>
            ))}
          </div>
          <div className={styles.casesSlider}>
            {data?.reviews.slice(0, 3).map((item, key) => (
              <button
                className={cn(styles.buttonSliderBlock, {
                  [styles.buttonSliderBlockActive]: key === active
                })}
                key={key}
                onClick={() => setActive(key)}
              />
            ))}
          </div>
        </section> :

        null}
  
          {data?.questions !== null ?
           
            <section className={styles.questions}>
            <div className={styles.questionsWrapper}>
              <div>
                <Headlines tag='h3'>{data?.questions}</Headlines>
                <Button>{data?.question_link}</Button>
              </div>
            </div>
          </section>: 
          
          null}
        </main>
      </>
    )
}


export default withLayout(SubServiceItem)