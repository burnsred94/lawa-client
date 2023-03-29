import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Headlines, Paragraph } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import { URL_SERVICES_PAGE, URL_SERVICE_PAGE } from '@/constants/constants'
import { useEffect, useState } from 'react'
import { ServicesPage } from '@/interfaces/services-page.interface'
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import styles from './style.module.scss'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { AssetService } from '@/services/AssetService'
import { Modal } from '@/components/Modal/Modal.component'
import ReactMarkdown from 'react-markdown'


function Services(): JSX.Element {
  const route = useRouter()
  const [data, setData] = useState<ServicesPage>()

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
      <>
        {data?.seo !== null ? <NextSeo
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
        {showModal && <Modal onClose={handleCloseModal} />}
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
        {data?.services !== null ?

          <section className={styles.service}>
            <div className={styles.serviceWrapper}>
              <div className={styles.serviceTitle}>
                <Headlines tag='h2'>{data?.title_services ? data.title_services : ''}</Headlines>
              </div>
              <ReactMarkdown className={styles.serviceSubDescription}>{data?.sub_description as string}</ReactMarkdown>
              <div className={styles.serviceItems}>
                {data?.services ? data.services.map((item, key) => {
                  if (item.publishedAt !== null) {
                    return (
                      <Service type='card' key={key} img={item.preview_img} link={route.asPath + '/' + item.slug}>{item.title}</Service>
                    )
                  }
                }) : null}
              </div>
              <div className={styles.serviceButton}>
                <Button init='link' link='/services'>Смотреть все</Button>
              </div>
            </div>
          </section> :

          null}

        {data?.spheres !== null ?

          <section className={styles.sphere}>
            <div className={styles.sphereWrapper}>
              <div className={styles.sphereTitle}>
                <Headlines tag="h2">{data?.title_sphere ? data.title_sphere : ''}</Headlines>
                <Button init='link' link='/sphere'>Смотреть все предложения</Button>
              </div>
              <div className={styles.sphereBlock}>
                {data?.spheres ? data?.spheres.map((value, key) => (
                  <div key={key} className={styles.sphereBlockWrapper}>
                    {value.img !== null ?
                      <Link href='/sphere'>
                        <div className={styles.sphereBlockItem}>
                          <Image
                            priority
                            loader={() => loaderImage(value.img.url)}
                            width={90}
                            height={90}
                            src={process.env.NEXT_PUBLIC_DOMAIN + value.img?.url}
                            alt='img'
                          />
                        </div>
                        <Paragraph type="normal-text">{value.title}</Paragraph>
                      </Link> : null}
                  </div>
                )) : null}
              </div>
            </div>
          </section> :

          null}

        {data?.list_result !== null ?

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
                      {item.img !== null ? <Image priority alt={item.img.hash} width={45} height={45} src={process.env.NEXT_PUBLIC_DOMAIN + item.img.url} /> : null}
                      <Paragraph type="normal-text">{item.description}</Paragraph>
                    </li>
                  ))}
                </ul>
              </div>
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
                  Получаете вы
                </Headlines>
                <ul className={styles.processLastItems}>
                  {data?.table.You ? data?.table.You.map((listItem, key) => (
                    <li key={key}>{listItem.text}</li>
                  )) : null}
                </ul>
              </div>
            </div>
          </section> :

          null}

        {data?.trust_images !== null ?

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
          </section> :

          null}

        {data?.title_question !== null ?

          <section className={styles.questions}>
            <div className={styles.questionsWrapper}>
              <div>
                <Headlines tag='h3'>{data?.title_question ? data?.title_question : ''}</Headlines>
                <Button init='button' onClick={() => handleOpenModal()}>Обсудить проект</Button>
              </div>
            </div>
          </section> :

          null}
      </main>
    </>
  )
}


export default withLayout(Services)