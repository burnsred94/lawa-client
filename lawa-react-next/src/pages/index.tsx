import { Button, Paragraph, Headlines } from '@/components'
import styles from "../styles/Home.module.scss"
import Image from 'next/image'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Form } from '@/components/Form/Form'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import axios from 'axios'
import { MainPage } from '@/interfaces/main-page.interface'
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import { URL_MAIN_PAGE } from '@/constants/constants'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { AssetService } from '@/services/AssetService'
import { Modal } from '@/components/Modal/Modal.component'
import reviews from './reviews'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { SliderAuto } from '@/components/Slider/Slider'
import { ScrollToTopButton } from '@/components/ScrollButton/ScrollButton.component'



function Home({ page: data }: HomeProps) {
  const [active, setActive] = useState(0)
  const [activeReview, setActiveReview] = useState(0)
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const route = useRouter()
  const link = `https://lawa.by${route.asPath}`
  const canonicalLink = link.includes('?') ? link.substring(0, link.indexOf('?')) : link
  const assetService = new AssetService({ assetsBase: process.env.NEXT_PUBLIC_DOMAIN as string })


  return (
    <>
      <>
        <NextSeo
          title={data?.seo?.title}
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

        />
      </>
      {data && <main className={styles.main}>
        <ScrollToTopButton />
        {showModal && <Modal onClose={handleCloseModal} />}
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
                <Button init='button' onClick={() => handleOpenModal()}>Связаться с нами</Button>
              </div>
              <div className={styles.headerImages}>
                {
                  data?.header_image ? <Image src={process.env.NEXT_PUBLIC_DOMAIN + data.header_image.url} alt={data.header_image.name} width={450} height={450}
                    decoding="async" priority={true}
                  /> : null
                }
              </div>
              <div className={styles.headerSocial}>
                <div className={styles.headerSocialWrapper}>
                  <div className={styles.headerSocialItems}>
                    {data?.social.map((social, key) => (
                      <div key={key} className={styles.headerSocialItem}>
                        <a href={social.address}>
                          <Image decoding="async" src={process.env.NEXT_PUBLIC_DOMAIN + social.img.url} alt={social.img.name} width={17} height={17} />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className={styles.headerSocialTime}>
                    {data?.time_work ? <span>Время работы:</span> : null}
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
                  <Service type='card' key={key} img={item.preview_img} link={`services/${item.slug}`}>{item.title}</Service>
                )) : null}
              </div>
              <div className={styles.serviceButton}>
                <Button init='link' link={'/services'}>Смотреть все</Button>
              </div>
            </div>
          </section> :

          null}

        {data?.approach_list !== null ?

          <section className={styles.approach}>
            <div className={styles.approachImages}>
              {data?.approach_image ? <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + data.approach_image.url}
                alt={data.approach_image.name}
                decoding="async"
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
                      decoding="async"
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
              <Button init='link' link='/cases'>Смотреть все работы</Button>
            </div>
            <div className={styles.casesCards}>
              {data?.cases ? data.cases.map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === active,
                  [styles.casesNonActive]: key !== active
                })}>
                  <Service type='card-partners' img={item.image} link={item.link}>{item.description}</Service>
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
              <ReactMarkdown>{data?.slogan ? `${data?.slogan}` : ''}</ReactMarkdown>
            </div>
          </section> :

          null}

        {data?.reviews !== null ?

          <section className={styles.cases}>
            <div className={styles.casesTitle}>
              <Headlines tag='h2'>Отзывы</Headlines>
              <Button init='link' link={'/reviews'} >Смотреть все Отзывы</Button>
            </div>
            <div className={styles.reviewCards}>
              {data?.reviews ? data.reviews.slice(0, 3).map((item, key) => (
                <div key={key} className={cn(styles.casesDefualt, {
                  [styles.casesActive]: key === activeReview,
                  [styles.casesNonActive]: key !== activeReview
                })}>
                  <Service type='card-review' link={item.link} img={item.logo} title={item.name} text={item.description} client_name={item.post} />
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
              <div className={styles.trustImages}>
                <SliderAuto data={data?.trust_images !== undefined ? data.trust_images : null} />
              </div>
            </div>
          </section>

          : null}
        {data?.title_form ?

          <section className={styles.form}>
            <div className={styles.formWrapper}>
              <div className={styles.formWrapperImage}>
                <Image decoding='async' src='/images/message.webp' width={650} height={650} alt='message' />
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
                <Button init='button' onClick={() => handleOpenModal()}>Обсудить проект</Button>
              </div>
            </div>
          </section> :

          null}

      </main>}
    </>
  )
}


export const getServerSideProps = async () => {
  const { data: page } = await axios.get<HomeProps>(process.env.NEXT_PUBLIC_DOMAIN as string + URL_MAIN_PAGE);
  return {
    props: {
      page
    }
  };
};

export interface HomeProps extends Record<string, unknown> {
  page: MainPage
}


export default withLayout(Home)