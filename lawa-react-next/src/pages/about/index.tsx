import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Button } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Headlines } from '@/components/Headlines/Headlines'
import { Paragraph } from '@/components/Paragraph/Paragraph'

import { pageAbout, social } from '../../mock/mock.data'
import {AboutProps} from './about.props'
import styles from './style.module.scss'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'


function About ({...props}: AboutProps): JSX.Element {
  const route = useRouter()

  const data = pageAbout

  return (
    <>
      <main>
        <section className={styles.header}>
          <div className={styles.headerWrapper}>
            <Headlines tag='h1'>О Компании</Headlines>
          </div>
        </section>
        <section className={styles.breadCrumb}>
          <div className={styles.breadCrumbWrapper}>
            <Breadcrumbs data={[{ title: 'О компании', path: route.asPath }]} />
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
                  {data?.title}
                </Headlines>
              </div>
              <div className={styles.resultDescr}>
                <Paragraph type='normal-text'>
                  {data?.description}
                </Paragraph>
                <Button>Смотреть услуги</Button>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.director}>
          <div className={styles.directorWrapper}>
            <div className={styles.directorText}>
              <Headlines tag='h2'>Обращение директора</Headlines>
              <div className={styles.directorTextMission}>
                <span className={styles.directorTextMissionTitle}>
                  Миссия:
                </span>
                <Paragraph type="sub-title-text-dull">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Paragraph>
                <span className={styles.directorTextMissionTitle}>
                  Ценности:
                </span>
                <Paragraph type="sub-title-text-dull">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Paragraph>
                <Paragraph type="normal-text">{data.missionText}</Paragraph>
              </div>
            </div>
            <div className={styles.directorImage}>

            </div>
          </div>
        </section>
        <section className={styles.executives}>
          <div className={styles.executivesTitle}>
            <Headlines tag="h2">Руководители: «Огонь в глазах»</Headlines>
          </div>
          <div className={styles.executivesWrapper}>
            {data.executives.map((execution, key) => (
              <div key={key}>
                <Service type='executives-card' text={execution.name} img={execution.image}>{execution.post}</Service>
              </div>
            ))}
          </div>
        </section>
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
                  {social.map((social, key) => (
                    <div key={key} className={styles.contactsDownSocialItem}>
                      <Image src={social.img} alt="Social Icon" width={17} height={17} />
                      <a href={social.link}></a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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


export default withLayout(About)