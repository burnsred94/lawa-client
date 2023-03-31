import Image from 'next/image'

import { Button } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Headlines } from '@/components/Headlines/Headlines'
import { Paragraph } from '@/components/Paragraph/Paragraph'
import { useRouter } from 'next/router'
import styles from './style.module.scss'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import axios from 'axios'
import { URL_ABOUT_PAGE } from '@/constants/constants'
import { AboutPage } from '@/interfaces/about-page.interfaces'
import { NextSeo } from 'next-seo'
import { AssetService } from '@/services/AssetService'
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Modal } from '@/components/Modal/Modal.component'

function About(): JSX.Element {
  const route = useRouter()
  const [active, setActive] = useState<number>(1)

  // const data = page[0]

  const [data, setData] = useState<AboutPage>()
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get<AboutPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_ABOUT_PAGE);
        if (data) {
          setData(data[0])
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [router.query])

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

  return (
    <>
      {data?.seo ? <NextSeo
        title={data?.seo?.title}
        description={data?.seo.description}
        canonical={canonicalLink}
        openGraph={{
          url: canonicalLink,
          title: data?.seo?.title,
          description: data?.seo?.description ? data.seo.description : '',
          images: [{
            url: `${assetService.permalink(`${data?.seo.image.url as string || ''}`, 'asset')}`,
            width: data?.seo.image.width || 2400,
            height: data?.seo.image.height || 1252,
            alt: 'Lawa',
            type: data?.seo.image.mime || 'image/jpeg',
          }],
        }}
      /> : null}
      <main>
        {showModal && <Modal onClose={handleCloseModal} />}
        {data?.title_header ?

          <section className={styles.header}>
            <div className={styles.headerWrapper}>
              <Headlines tag='h1'>{data?.title_header}</Headlines>
            </div>
          </section> :

          null}

        {data?.title_header ?

          <section className={styles.breadCrumb}>
            <div className={styles.breadCrumbWrapper}>
              <Breadcrumbs data={[{ title: data?.title_header as string, path: route.asPath }]} />
            </div>
          </section> :

          null}

        {data?.description ?

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
                <div className={styles.resultDescr}>
                  <Paragraph type='normal-text'>
                    {data?.description}
                  </Paragraph>
                  <Button init='link' link='/services'>Смотреть услуги</Button>
                </div>
              </div>
            </div>
          </section> :

          null}

        {data?.description_director ?

          <section className={styles.director}>
            <div className={styles.directorWrapper}>
              <div className={styles.directorText}>
                <Headlines tag='h2'>{data?.title_director}</Headlines>
                <div className={styles.directorTextMission}>
                  {data?.description_director.map((item, index) => {
                    if (item.text && item.title) {
                      return (
                        <>
                          <div key={index}>
                            <span className={styles.directorTextMissionTitle}>
                              {item.title}
                            </span>
                            <Paragraph type="sub-title-text-dull">
                              {item.text}
                            </Paragraph>
                          </div>
                        </>
                      )
                    } else {
                      <Paragraph type="normal-text">{item.slug}</Paragraph>
                    }
                  })}
                </div>
              </div>
              <div className={styles.directorImage}>
                <Image
                  loader={() => loaderImage(data?.image_director.url ? data?.image_director.url : '')}
                  alt={data?.image_director.hash as string}
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.image_director.url}`}
                  width={570}
                  height={500} />
              </div>
            </div>
          </section> :

          null}

        {data?.executives ?

          <section className={styles.executives}>
            <div className={styles.executivesTitle}>
              <Headlines tag="h2">{data?.title_executives as string}</Headlines>
            </div>
            <div className={styles.executivesWrapper}>
              {data.executives.map((execution, key) => (
                <div key={key} className={cn(styles.executivesDefualt, {
                  [styles.executivesActive]: key === active,
                  [styles.executivesNonActive]: key !== active
                })}>
                  <Service type='executives-card' text={execution.name} img={execution.img}>{execution.post}</Service>
                </div>
              ))}
            </div>
            <div className={styles.executivesSlider}>
              {data && data.executives.slice(0, 3).map((item, key) => (
                <button
                  className={cn(styles.executivesButtonSlider, {
                    [styles.executivesButtonSliderActive]: key === active
                  })}
                  key={key}
                  onClick={() => setActive(key)}
                />
              ))}
            </div>
          </section> :

          null}

        {data?.data_contacts ?

          <section className={styles.contacts}>
            <div className={styles.contactsTitle}>
              <Headlines tag="h2">Контакты</Headlines>
            </div>
            <div className={styles.contactsWrapper}>
              <div className={styles.contactsUp}>
                <div className={styles.contactsUpAddress}>
                  <span className={styles.contactsBlockTitle}>
                    Юридический и почтовый адрес:
                  </span>
                  <div className={styles.contactsBlockSub}>
                    <Image src='/svg/pin.svg' width={24} height={24} alt='pin' />
                    <span>
                      220004, Республика Беларусь, г. Минск, ул. М. Танка, 20, каб 100, отдел 1
                    </span>
                  </div>
                </div>
                <div className={styles.contactsUpTelefon}>
                  <span className={styles.contactsBlockTitle}>
                    Телефоны:
                  </span>
                  <div className={styles.contactsBlockNumbers}>
                    <div>
                      <span className={styles.contactsBlockTitleSmall}>Отдел продаж:</span>
                      <div className={styles.contactsBlockSub}>
                        <Image src='/svg/tel.svg' width={24} height={24} alt='pin' />
                        <a href="tel:+375 29 220 91 11">+375 29 220 91 11</a>
                      </div>
                    </div>
                    <div>
                      <span className={styles.contactsBlockTitleSmall}>Клиент сервис:</span>
                      <div className={styles.contactsBlockSub}>
                        <Image src='/svg/tel.svg' width={24} height={24} alt='pin' />
                        <a href="tel:+375 29 220 91 11">+375 29 220 91 11</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.contactsDown}>
                <div className={styles.contactsDownEmail}>
                  <span className={styles.contactsBlockTitle}>E-mail:</span>
                  <div className={styles.contactsBlockSub}>
                    <Image src='/svg/email.svg' width={24} height={24} alt='pin' />
                    <a href="mailto:hello@lawa.by">hello@lawa.by</a>
                  </div>
                </div>
                <div className={styles.contactsDownSocial}>
                  <span className={styles.contactsBlockTitle}>Соцсети:</span>
                  <div className={styles.contactsDownSocialItems}>
                    {/* {social.map((social, key) => (
                      <div key={key} className={styles.contactsDownSocialItem}>
                        <Image src={social.img} alt="Social Icon" width={17} height={17} />
                        <a href={social.link}></a>
                      </div>
                    ))} */}
                  </div>
                </div>
              </div>
            </div>
          </section> :

          null}

        {data?.questions ?

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

// export const getStaticProps = async () => {
//   const { data: page } = await axios.get<AboutPage>(process.env.NEXT_PUBLIC_DOMAIN + URL_ABOUT_PAGE);

//   return {
//     props: {
//       page
//     },
//   };
// };

// export interface AboutProps extends Record<string, unknown> {
//   page: AboutPage[];
// }


export default withLayout(About)


