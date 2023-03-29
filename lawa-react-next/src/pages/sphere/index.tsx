import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { Button, Headlines, Paragraph } from '@/components'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Service } from '@/components/service/Service'
import { withLayout } from '@/layout/layout'
import ReactMarkdown from 'react-markdown'
import styles from './style.module.scss'
import axios from 'axios'
import { URL_SERVICE_PAGE, URL_SPHERE_PAGE } from '@/constants/constants'
import { Service as ServiceItem } from '@/interfaces/service-page.interface'
import { AssetService } from '@/services/AssetService'
import { NextSeo } from 'next-seo'
import { Modal } from '@/components/Modal/Modal.component'
import { SpherePage } from '@/interfaces/sphere-page.interface'

function Sphere({ page }: SphereProps): JSX.Element {
    const route = useRouter()
    const [activeReview, setActiveReview] = useState()
    const [active, setActive] = useState(0)

    const data = page[0]

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

                {data?.title !== null ?

                    <section className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <Headlines tag='h1'>{data && data.title}</Headlines>
                        </div>
                    </section> :

                    null}
                {data?.title !== null && data?.description !== null ?

                    <section className={styles.result}>
                        <div className={styles.resultWrapper}>
                            <div className={styles.resultImages}>
                                <div className={styles.resultImagesLeft} />
                                <div className={styles.resultImagesRight} />
                            </div>
                            <div className={styles.resultList}>
                                <div className={styles.resultTitle}>
                                    <Headlines tag="h2">
                                        {data && data.title}
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

                {data?.services !== null ?

                    <section className={cn(styles.specifics, {
                        [styles.specificsGridTheere]: data?.services.length !== undefined && data?.services.length < 4,
                        [styles.specificsGridAdaptive]: data?.services.length !== undefined && data?.services.length % 2 !== 0,
                    })}>
                        {
                            data?.services.map((item, key) => {
                                if (item.publishedAt !== null) {
                                    return (
                                        <Service key={key} type='specific-card'
                                            link={route.query.pages + '/' + item.slug}
                                            img={item.preview_img}
                                            text={item.title}>{item.description}</Service>
                                    )
                                }
                            })
                        }
                    </section> :

                    null}



                {data?.we_and_you !== null ?

                    <section className={styles.process}>
                        <div className={styles.processWrapper}>
                            <div className={styles.processFirst}>
                                <Headlines tag="h3">
                                    Делаем мы
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
                                    Получаете вы
                                </Headlines>
                                <ul className={styles.processLastItems}>
                                    {data?.we_and_you.You.map((listItem, key) => (
                                        <li key={key}>{listItem.text}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section> :

                    null}

                {data?.cases.length ?

                    <section className={styles.cases}>
                        <div className={styles.casesTitle}>
                            <Headlines tag='h2'>Наши Кейсы</Headlines>
                            <Button init='link' link='/cases'>Смотреть все работы</Button>
                        </div>
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
                                        [styles.casesButtonSliderActive]: key === active
                                    })}
                                    key={key}
                                    onClick={() => setActive(key)}
                                />
                            ))}
                        </div>
                    </section> :

                    null}

                {data?.reviews.length ?

                    <section className={styles.cases}>
                        <div className={styles.casesTitle}>
                            <Headlines tag='h2'>{data?.title_cases}</Headlines>
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
                            {data?.cases.slice(0, 3).map((item, key) => (
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

                {data?.question !== null ?

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


export const getStaticProps = async () => {
    const { data: page } = await axios.get<SpherePage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_SPHERE_PAGE);

    return {
        props: {
            page
        },
    };
};

export interface SphereProps extends Record<string, unknown> {
    page: SpherePage[];
}




export default withLayout(Sphere)