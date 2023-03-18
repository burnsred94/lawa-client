import Head from 'next/head'
import { Button, Paragraph, Headlines } from '@/components'
import styles from "../styles/Home.module.scss"
import Image from 'next/image'
import cn from 'classnames'
import { social, service, approach, cases, reviews, partners } from '../mock/mock.data'
import { Attributes, useEffect, useRef, useState } from 'react'
import { Form } from '@/components/Form/Form'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import axios from 'axios'
import { MainPage } from '@/interfaces/main-page.interface'
import { ImageObject } from '@/interfaces/image.interface'
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import { URL_MAIN_PAGE, URL_SERVICE_PAGE } from '@/constants/constants'
import { useRouter } from 'next/router'



function Home() {
  const route = useRouter()
  const [active, setActive] = useState(0)
  const [activeReview, setActiveReview] = useState(0)
  const [data, setData] = useState<MainPage>()


  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get<MainPage>(process.env.NEXT_PUBLIC_DOMAIN + URL_MAIN_PAGE);
        if (data) {
          setData(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [route.query])

  console.log(data)

  return (
    <>
      <Head>
        <title>{data?.seo.title}</title>
        <meta name="description" content={`${data?.seo.description}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.seo.image.formats.medium.url}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/svg/logo.svg" />
      </Head>
      <main className={styles.main}>
        {data?.header_image !== null && data?.title !== null ?

          <section className={styles.header}>
            <div className={styles.headerWrapper}>
              <div className={styles.headerText}>
                <Headlines tag='h1'>
                  {data && data.title}
                </Headlines>
                <Paragraph type='sub-title-text-dull'>
                  {data && data.sub_title}
                </Paragraph>
                <Button>Связаться с нами</Button>
              </div>
              <div className={styles.headerImages}>
                {
                  data?.header_image ? <Image loader={
                    () => loaderImage(data.header_image.url)} src={process.env.NEXT_PUBLIC_DOMAIN + data.header_image.url} alt={data.header_image.name} width={450} height={450} /> : null
                }
              </div>
              <div className={styles.headerSocial}>
                <div className={styles.headerSocialWrapper}>
                  <div className={styles.headerSocialItems}>
                    {data?.social.map((social, key) => (
                      <div key={key} className={styles.headerSocialItem}>
                        <a href={social.address}>
                        <Image loader={()=> loaderImage(social.img.url)} src={process.env.NEXT_PUBLIC_DOMAIN + social.img.url} alt={social.img.name} width={17} height={17} />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className={styles.headerSocialTime}>
                    <span>Время работы:</span>
                    <span>
                      {data && data.time_work}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section> :

          null}

        {data?.services !== null ?

          <section className={styles.service}>
            <div className={styles.serviceWrapper}>
              <div className={styles.serviceTitle}>
                <Headlines tag='h2'>
                  {data && data.title_services}
                </Headlines>
              </div>
              <div className={styles.serviceItems}>
                {data?.services ? data.services.map((item, key) => (
                  <Service type='card' key={key} img={item.preview_img?.url as string} link={`services/${item.slug}`}>{item.title}</Service>
                )) : null}
              </div>
              <div className={styles.serviceButton}>
                <Button>Смотреть все</Button>
              </div>
            </div>
          </section> :

          null}

        {data?.approach_list !== null ?

          <section className={styles.approach}>
            <div className={styles.approachImages}>
              {data?.approach_image ? <Image
                loader={() => loaderImage(data.approach_image.url)}
                src={process.env.NEXT_PUBLIC_DOMAIN + data.approach_image.url}
                alt={data.approach_image.name}
                width={495}
                height={506}
              /> : null}
            </div>
            <div className={styles.approachList}>
              <Headlines tag='h2'>{data && data.title_approach}</Headlines>
              <ul className={styles.approachListItems}>
                {data?.approach_list ? data.approach_list.map((item, key) => (
                  <li key={key} className={styles.approachListItem}>
                    <Image
                      loader={() => loaderImage(item.img.url)}
                      src={process.env.NEXT_PUBLIC_DOMAIN + item.img.url}
                      width={40}
                      height={40}
                      alt={item.title}
                    />
                    <Paragraph type='normal-text'>{item.title}</Paragraph>
                    <span>
                      {item.description}
                    </span>
                  </li>
                )) : null}
              </ul>
            </div>
          </section> :

          null}

        {data?.cases !== null ?

          <section className={styles.cases}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>{data && data.title_cases}</Headlines>
              <Button>Смотреть все работы</Button>
            </div>
            <div className={styles.casesCards}>
              {data?.cases ? data.cases.map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === active,
                  [styles.casesNonActive]: key !== active
                })}>
                  <Service type='card-partners' img={item.image.url} link={item.link}>{item.description}</Service>
                </div>
              )) : null}
            </div>
            <div className={styles.casesSlider}>
              {data && data.reviews.slice(0, 3).map((item, key) => (
                <button
                  className={cn(styles.casesButtonSlider, {
                    [styles.casesButtonSliderActive]: key === active
                  })}
                  key={key}
                  onClick={() => setActive(key)}
                />
              ))}
            </div>
          </section> :

          null}

        {data?.slogan !== null ?

          <section className={styles.slogan}>
            <div className={styles.sloganWrapper}>
              <Headlines tag='h4'>{data?.slogan ? data.slogan : ''}</Headlines>
            </div>
          </section> :

          null}

        {data?.reviews !== null ?

          <section className={styles.cases}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>Отзывы</Headlines>
              <Button>Смотреть все Отзывы</Button>
            </div>
            <div className={styles.reviewCards}>
              {data?.reviews ? data.reviews.map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === activeReview,
                  [styles.casesNonActive]: key !== activeReview
                })}>
                  <Service type='card-review' img={item.logo.url} title={item.name} text={item.description} client_name={item.post} />
                </div>
              )) : null}
            </div>
            <div className={styles.casesSlider}>
              {data?.reviews ? data.reviews.slice(0, 3).map((item, key) => (
                <button
                  className={cn(styles.buttonSliderBlock, {
                    [styles.buttonSliderBlockActive]: key === active
                  })}
                  key={key}
                  onClick={() => setActive(key)}
                />
              )) : null}
            </div>
          </section> :

          null}
        {data?.trust_images !== null ?

          <section className={styles.trust}>
            <div className={styles.trustWrapper}>
              <div className={styles.casesTitle}>
                <Headlines tag='h2'>{data?.title_trust ? data.title_trust : ''}</Headlines>
              </div>
            </div>
            <div className={styles.trustBlocks}>
              <button className={styles.trustButtonLeft}>
                <Image src='svg/arrow-left.svg' alt='arrow' width={24} height={24} priority />
              </button>
              {
                data?.trust_images ? data.trust_images.map((item, key) => (
                  <div key={key} className={styles.trustImage}>
                    <Image
                      loader={() => loaderImage(item.url)}
                      src={process.env.NEXT_PUBLIC_DOMAIN + item.url}
                      alt={item.name}
                      width={220}
                      height={170}
                    />
                  </div>
                )) : null
              }
              <button className={styles.trustButtonRight}>
                <Image src='svg/arrow-right.svg' alt='arrow' width={24} height={24} priority />
              </button>
            </div>
          </section>

          : null}
        {data?.title_form ?

          <section className={styles.form}>
            <div className={styles.formWrapper}>
              <div className={styles.formWrapperImage}>
                <Image src='/images/message.png' width={650} height={650} alt='message' />
              </div>
              <div className={styles.formWrapperFields}>
                <Headlines tag='h3'>{data?.title_form ? data.title_form : ''}</Headlines>
                <Paragraph type='sub-title-text-dull'>{data?.description_form ? data.description_form : ''}</Paragraph>
                <Form />
              </div>
            </div>
          </section> :

          null}
        {data?.questions !== null ?

          <section className={styles.questions}>
            <div className={styles.questionsWrapper}>
              <div>
                <Headlines tag='h3'>{data?.questions.title ? data.questions.title : ''}</Headlines>
                <Button>Обсудить проект</Button>
              </div>
            </div>
          </section> :

          null}
      </main>
    </>
  )
}


// export const getStaticPaths = async () => {
//   const { data: page } = await axios.get<HomeProps>(process.env.NEXT_PUBLIC_DOMAIN + URL_SERVICE_PAGE);
//   return {
//     props: {
//       page
//     },
//     fallback: false
//   };
// };

// export interface HomeProps extends Record<string, unknown> {
//   page: MainPage
// }


export default withLayout(Home)