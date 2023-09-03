import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Button, Headlines, Paragraph } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import { cases, reviews, slugPageData } from '@/mock/mock.data'

import { SlugProps } from './slug.props'
import styles from './style.module.scss'
import { SubService } from '@/interfaces/sub-service-page.interfaces'
import axios from 'axios'
import { URL_SUB_SERVICES_PAGE } from '@/constants/constants'
import { AssetService } from '@/services/AssetService'
import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import { Modal } from '@/components/Modal/Modal.component'
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import { ScrollToTopButton } from '@/components/ScrollButton/ScrollButton.component'


function SlugPage({ ...props }: SlugProps): JSX.Element {
  const route = useRouter()
  const [activeReview, setActiveReview] = useState()
  const [active, setActive] = useState(0)
  const [data, setData] = useState<SubService>()

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const link = `https://lawa.by${route.asPath}`
  const canonicalLink = link.includes('?') ? link.substring(0, link.indexOf('?')) : link
  const assetService = new AssetService({ assetsBase: process.env.NEXT_PUBLIC_DOMAIN as string })


  useEffect(() => {
    async function fetchData() {
      try {
        if (route.query.slug) {
          const { data } = await axios.get<SubService>(process.env.NEXT_PUBLIC_DOMAIN + URL_SUB_SERVICES_PAGE + route.query.slug);
          setData(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [route.query])

  console.log(data?.cases)

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
        <ScrollToTopButton />
        {showModal && <Modal onClose={handleCloseModal} url={link} />}
        {data?.title !== null ?

          <section className={styles.header}>
            <div className={styles.headerWrapper}>
              <Headlines tag='h1'>{data?.title}</Headlines>
            </div>
          </section> :

          null}

        {data?.service.title !== null && data?.service.slug !== null ?

          <section className={styles.breadCrumb}>
            <div className={styles.breadCrumbWrapper}>
              <Breadcrumbs data={[
                { title: 'Услуги', path: '/' + route.asPath.split('/').splice(0, 2).join('') },
                {
                  title: data?.service.title !== undefined ? data?.service.title : '', path: typeof route.query.pages === 'string' ? '/' +
                    route.asPath.split('/').splice(0, 2).join('') + '/' + route.query.pages : ''
                },
                { title: data?.title !== undefined ? data?.title : '', path: route.asPath }
              ]} />
            </div>
          </section> :

          null}

        {data?.title !== null ?

          <section className={styles.result}>
            <div className={styles.resultWrapper}>
              {data?.images?.length as number > 0 ?
                <div className={styles.resultImages}>
                  <div className={styles.resultImagesLeft}>
                    {data?.images[0] !== undefined ?

                      <Image
                        loader={() => loaderImage(data?.images[0].url as string)}
                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.images[0].url}`}
                        width={data?.images[0].width || 2400}
                        height={data?.images[0].height || 1252}
                        alt="left" />

                      : null}

                  </div>
                  <div className={styles.resultImagesRight}>
                    {data?.images[1] !== undefined ?

                      <Image
                        loader={() => loaderImage(data?.images[1].url as string)}
                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.images[0].url}`}
                        width={270}
                        height={470}
                        alt="left" />

                      : null}
                  </div>
                </div>
                : null}
              <div className={styles.resultList}>
                <div className={styles.resultTitle}>
                  <Headlines tag="h2">
                    {data?.title}
                  </Headlines>
                </div>
                <div className={styles.resultList}>
                  <ReactMarkdown className={styles.resultListDescription}>{data?.description as string}</ReactMarkdown>
                  <Button init='button' onClick={() => handleOpenModal()}>Заказать услугу</Button>
                </div>
              </div>
            </div>
          </section> :

          null}

        {data?.sub_service_items !== null ?
          <section className={cn(styles.services, {
            [styles.servicesGridTheere]: data?.sub_service_items.length !== undefined && data?.sub_service_items.length < 4,
            [styles.servicesGridAdaptive]: data?.sub_service_items.length !== undefined && data?.sub_service_items.length % 2 !== 0,
          })}>
            {
              data && data.sub_service_items.map((item, key) => {
                if (item.publishedAt !== null) {
                  return (
                    <Service key={key} type='specific-card'
                      link={route.asPath + '/' + item.slug}
                      img={item.image_preview}
                      text={item.title}>{item.decsription_preview}</Service>
                  )
                }
              })
            }
          </section> :

          null}

        {data?.list.length ?

          <section className={styles.specifics}>
            <div className={styles.specificsTitle}>
              <Headlines tag='h2' >{'Наш Арсенал'}</Headlines>
            </div>
            <div className={styles.specificsArsenal}>
              {data && data.list.map((item, key) => (
                <div key={key} className={styles.specificsArsenalItem}>
                  <Service type='arsenal-card' text={item.description} img={item.img}>{item.title}</Service>
                </div>
              ))}
            </div>
          </section> :

          null}

        {data?.table !== null ?

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
                  {data?.table.title_you}
                </Headlines>
                <ul className={styles.processLastItems}>
                  {data?.table.You.map((listItem, key) => (
                    <li key={key}>{listItem.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section> :

          null}

        {data?.cases.length !== 0 ?

          <section className={styles.cases}>
            {data?.cases.length !== null ? <div className={styles.casesTitle}>
              <Headlines tag='h2'>{"Наши Кейсы"}</Headlines>
              <Button init='link' link='/cases'>Смотреть все работы</Button>
            </div> : null}
            <div className={styles.casesCards}>
              {data?.cases.map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === active,
                  [styles.casesNonActive]: key !== active
                })}>
                  <Service type='card-partners' img={item.image} link={item.link}>{item.description}</Service>
                </div>
              ))}
            </div>
            <div className={styles.casesSlider}>
              {data?.cases.slice(0, 3).map((item, key) => (
                <button
                  className={cn(styles.casesButtonSlider, {
                    [styles.casesActive]: key === active,
                    [styles.casesNonActive]: key !== active
                  })}
                  key={key}
                  onClick={() => setActive(key)}
                />
              ))}
            </div>
          </section> :
          null}

        {data?.reviews.length !== 0 ?

          <section className={styles.cases}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>Отзывы</Headlines>
              <Button init='link' link='/reviews'>Смотреть все Отзывы</Button>
            </div>
            <div className={styles.reviewCards}>
              {data?.reviews.map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === active,
                  [styles.casesNonActive]: key !== active
                })}>
                  <Service type='card-review' img={item.logo} title={item.post} text={item.description} client_name={item.name} />
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
          </section> :

          null}

        {data?.questions !== null ?

          <section className={styles.questions}>
            <div className={styles.questionsWrapper}>
              <div>
                <Headlines tag='h3'>Остались вопросы?</Headlines>
                <Button init='button' onClick={() => handleOpenModal()}>Обсудить проект</Button>
              </div>
            </div>
          </section> :

          null}
      </main>
    </>
  )
}


export default withLayout(SlugPage)