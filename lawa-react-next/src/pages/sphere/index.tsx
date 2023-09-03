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
import { loaderImage } from '@/utils/image-loader/image-loader.utlis'
import Link from 'next/link'
import { it } from 'node:test'
import { ScrollToTopButton } from '@/components/ScrollButton/ScrollButton.component'

function Sphere(): JSX.Element {
    const route = useRouter()
    const [activeReview, setActiveReview] = useState()
    const [active, setActive] = useState(0)

    // const data = page[0]


    const [data, setData] = useState<SpherePage>()

    console.log(data?.images_header[0])

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get<SpherePage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_SPHERE_PAGE);
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
                <ScrollToTopButton />
                {showModal && <Modal onClose={handleCloseModal} url={link} />}

                {data?.title !== null ?

                    <section className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <Headlines tag='h1'>{data && data.title}</Headlines>
                        </div>
                    </section> :

                    null}

                {data?.title !== null ?

                    <section className={styles.breadCrumb}>
                        <div className={styles.breadCrumbWrapper}>
                            <Breadcrumbs data={[{ title: data?.title as string, path: route.asPath }]} />
                        </div>
                    </section> :

                    null}

                {data?.spheres !== null ?

                    <section className={styles.sphere}>
                        <div className={styles.sphereWrapper}>
                            <div className={styles.sphereTitle}>
                                <Headlines tag="h2">{data?.title ? data.title : ''}</Headlines>
                            </div>
                            <ReactMarkdown className={styles.sphereSubDescription}>{data?.description as string}</ReactMarkdown>
                            <div className={styles.sphereBlock}>
                                {data?.spheres ? data?.spheres.map((value, key) => (
                                    <div key={key} className={styles.sphereBlockWrapper}>
                                        {value.img !== null ?
                                            <Link href={value.sphere?.slug ? `${route.asPath}/${value.sphere.slug}` : 'sphere'}>
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
                            {data?.images_header?.length as number > 0 ?
                                <div className={styles.resultImages}>
                                    <div className={styles.resultImagesLeft} >
                                        {data?.images_header[0] !== undefined ? <Image
                                            loader={() => loaderImage(data?.images_header[0].url as string)}
                                            src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.images_header[0].url}`}
                                            width={270}
                                            height={470}
                                            alt="left" /> : null}
                                    </div>
                                    <div className={styles.resultImagesRight}>
                                        {data?.images_header[1] !== undefined ? <Image
                                            loader={() => loaderImage(data?.images_header[1].url as string)}
                                            src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.images_header[0].url}`}
                                            width={270}
                                            height={470}
                                            alt="left" /> : null}
                                    </div>
                                </div>
                                : null}
                            <div className={styles.resultList}>
                                <div className={styles.resultTitle}>
                                    <Headlines tag="h2">
                                        {data?.title_result ? data.title_result : ''}
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
                    </section> :

                    null}

                {data?.cases.length ?

                    <section className={styles.cases}>
                        <div className={styles.casesTitle}>
                            <Headlines tag='h2'>{data?.title_cases ? data.title_cases : ''}</Headlines>
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
                            <Headlines tag='h2'>{data?.review_title ? data.review_title : ''}</Headlines>
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


// export const getStaticProps = async () => {
//     const { data: page } = await axios.get<SpherePage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_SPHERE_PAGE);

//     return {
//         props: {
//             page
//         },
//     };
// };

// export interface SphereProps extends Record<string, unknown> {
//     page: SpherePage[];
// }




export default withLayout(Sphere)