import Image from "next/image"
import { Button, Headlines } from "@/components"
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs"
import { URL_REVIEW } from "@/constants/constants"
import { Review } from "@/interfaces/single/review.interafaces"
import { withLayout } from "@/layout/layout"
import { loaderImage } from "@/utils/image-loader/image-loader.utlis"
import axios from "axios"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { useState } from "react"
import { Params } from "./interfaces/review.interfaces"
import styles from "./style.module.scss"
import cn from 'classnames'


function Review({ data }: ReviewProps): JSX.Element {
    const route = useRouter()
    const [active, setActive] = useState(0)

    console.log(route)
    return (
        <>
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
                    }}

                /> */}
            </>
            <main>
                <section className={styles.header}>
                    <div className={styles.headerWrapper}>
                        <Headlines tag='h1'>{data.name ? data.name : ''}</Headlines>
                    </div>
                </section>

                <section className={styles.breadCrumb}>
                    <div className={styles.breadCrumbWrapper}>
                        <Breadcrumbs data={[{ title: 'Наши отзывы', path: '/reviews/' }, { title: data.name, path: route.asPath }]} />
                    </div>
                </section>

                <section className={styles.content}>
                    <div className={styles.contentTitle}>
                        <Headlines tag="h2">{data.name ? data.name : ''}</Headlines>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.contentPhoto}>
                            <div className={styles.contentPhotoWrapper}>
                                {data.photo && data.photo.map((item, index) => (
                                    <div key={index} className={cn({
                                        [styles.contentPhotoItemActive]: index === active,
                                        [styles.contentPhotoItemNonActive]: index !== active,
                                    })}>
                                        <Image
                                            loader={() => loaderImage(item.url)}
                                            src={process.env.NEXT_PUBLIC_URL + item.url}
                                            width={item.width || 2400}
                                            height={item.height || 1252}
                                            alt={item.hash || ''}
                                        />
                                    </div>
                                ))}
                                <div className={styles.contentPhotoSlider}>
                                    {data && data.photo.map((item, key) => (
                                        <button
                                            className={cn(styles.contentPhotoSlider, {
                                                [styles.contentPhotoButtonSliderNonActive]: key !== active,
                                                [styles.contentPhotoButtonSliderActive]: key === active
                                            })}
                                            key={key}
                                            onClick={() => setActive(key)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentDescription}>
                            <div className={styles.contentDescriptionText}>
                                {data.description}
                            </div>
                            <div className={styles.contentDescriptionButton} >
                                <Button >Заказать Услугу</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.questions}>
                    <div className={styles.questionsWrapper}>
                        <div>
                            <Headlines tag='h3'>Остались вопросы?</Headlines>
                            <Button>Давайте обсудим</Button>
                        </div>
                    </div>

                </section>
            </main>

        </>
    )
}

export const getServerSideProps: GetServerSideProps<{ data: Review }> = async (context) => {
    const { slug } = context.params as Params

    const response = await axios.get<Review>(`${process.env.NEXT_PUBLIC_DOMAIN + URL_REVIEW}${slug}`).catch(error => {
        if (error.response?.status === 404) {
            return {
                notFound: true,
            }
        }
    })


    //@ts-ignore
    return response.data ? { props: { data: response.data } } : { notFound: true }
}

export interface ReviewProps extends Record<string, unknown> {
    data: Review
}


export default withLayout(Review)