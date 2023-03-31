import { Button, Headlines } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { MapYandex } from "@/components/Maps/Map";
import { URL_CONTACT_PAGE } from "@/constants/constants";
import { ContactPage } from "@/interfaces/contacts-page.interfaces";
import { withLayout } from "@/layout/layout";
import axios from "axios";
import { NextSeo } from "next-seo"
import { useRouter } from "next/router";
import styles from './style.module.scss'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal/Modal.component";

function Contacts(): JSX.Element {
  // const data = page[0]
  const route = useRouter()

  const [data, setData] = useState<ContactPage>()
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get<ContactPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_CONTACT_PAGE);
        setData(data[0])
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [route.query])


  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };



  return (
    <>
      {/* <NextSeo
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
          }} */}


      <>
        <main>
          {showModal && <Modal onClose={handleCloseModal} />}
          {data?.title ?

            <section className={styles.header}>
              <div className={styles.headerWrapper}>
                <Headlines tag='h1'>{data?.title}</Headlines>
              </div>
            </section> :

            null}

          {data?.title !== null ?

            <section className={styles.breadCrumb}>
              <div className={styles.breadCrumbWrapper}>
                <Breadcrumbs data={[
                  { title: 'Контакты', path: '/' + route.asPath.split('/').splice(0, 2).join('') }
                ]} />
              </div>
            </section> :

            null}
          <section className={styles.content}>
            <div className={styles.contentTitle}>
              <Headlines tag="h2">{data?.title}</Headlines>
            </div>
            <div className={styles.map}>
              <MapYandex />
            </div>

            <div className={styles.contacts}>
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
            </div>
          </section>
          {data?.question !== null ?

            <section className={styles.questions}>
              <div className={styles.questionsWrapper}>
                <div>
                  <Headlines tag='h3'>{data?.question.title}</Headlines>
                  <Button init='button' onClick={() => handleOpenModal()}>{data?.question.link}</Button>
                </div>
              </div>

            </section>

            : null}

        </main>
      </>
    </>
  )
}

// export const getStaticProps = async () => {
//   const { data: page } = await axios.get<ContactPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_CONTACT_PAGE);

//   return {
//     props: {
//       page
//     },
//   };
// };

// export interface ContactsProps extends Record<string, unknown> {
//   page: ContactPage[];
// }

export default withLayout(Contacts);