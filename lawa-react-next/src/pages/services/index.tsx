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
import { URL_SERVICES_PAGE, URL_SERVICE_PAGE } from '@/constants/constants'
import { GetStaticPropsContext } from 'next'
import { useEffect, useState } from 'react'
import { ServicesPage } from '@/interfaces/services-page.interface'
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'


function Services(): JSX.Element {
  const route = useRouter()
  const [data, setData] = useState<ServicesPage>()

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get<ServicesPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_SERVICES_PAGE);
        if (data) {
          setData(data[0])
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [route.query])


  return (
    <>
      <main>
        <section className={styles.header}>
          <div className={styles.headerWrapper}>
            <Headlines tag='h1'>{data?.title ? data.title : ''}</Headlines>
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
              <Headlines tag='h2'>{data?.title_services ? data.title_services : ''}</Headlines>
            </div>
            <div className={styles.serviceItems}>
              {data?.services ? data.services.map((item, key) => (
                <Service type='card' key={key} img={item.preview_img?.url} link={route.asPath + '/' + item.slug}>{item.title}</Service>
              )) : null}
            </div>
            <div className={styles.serviceButton}>
              <Button>Смотреть все</Button>
            </div>
          </div>
        </section>
        <section className={styles.sphere}>
          <div className={styles.sphereWrapper}>
            <div className={styles.sphereTitle}>
              <Headlines tag="h2">{data?.title_sphere ? data.title_sphere : ''}</Headlines>
              <Button>Смотреть все предложения</Button>
            </div>
            <div className={styles.sphereBlock}>
              {data?.spheres ? data?.spheres.map((value, key) => (
                <div key={key} className={styles.sphereBlockWrapper}>
                  <Link href='/sphere'>
                    <div className={styles.sphereBlockItem}>
                      <Image
                        priority
                        loader={() => loaderImage(value.img.url)}
                        width={90}
                        height={90}
                        src={process.env.NEXT_PUBLIC_DOMAIN + value.img.url}
                        alt='img'
                      />
                    </div>
                    <Paragraph type="normal-text">{value.title}</Paragraph>
                  </Link>
                </div>
              )) : null}
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
                  {data?.title_results ? data.title_results : ''}
                </Headlines>
              </div>
              <ul className={styles.resultListItems}>
                {data?.list_result && data?.list_result.map((item, key) => (
                  <li key={key}>
                    <Image priority alt={item.img.name} width={45} height={45} src={process.env.NEXT_PUBLIC_DOMAIN + item.img.url} />
                    <Paragraph type="normal-text">{item.description}</Paragraph>
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
                {data?.table.title_we}
              </Headlines>
              <ul className={styles.processFirstItems}>
                {data?.table.We.map((listItem, key) => (
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
                {data?.table.You ? data?.table.You.map((listItem, key) => (
                  <li key={key}>{listItem.text}</li>
                )) : null}
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.trust}>
          <div className={styles.trustWrapper}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>{data?.title_images ? data?.title_images : null}</Headlines>
            </div>
          </div>
          <div className={styles.trustBlocks}>
            <button className={styles.trustButtonLeft}>
              <Image src='/svg/arrow-left.svg' alt='arrow' width={24} height={24} priority />
            </button>
            {
              data?.trust_images.map((item, key) => (
                <div key={key} className={styles.trustImage}>
                  <Image
                    priority
                    loader={() => loaderImage(item.url)}

                    src={process.env.NEXT_PUBLIC_DOMAIN + item.url}
                    alt={item.name}
                    width={220}
                    height={120}
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
              <Headlines tag='h3'>{data?.title_question ? data?.title_question : ''}</Headlines>
              <Button>Обсудить проект</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}


export default withLayout(Services)