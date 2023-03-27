
import { GetServerSideProps } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Params } from "@/pages/reviews/[slug]/interfaces/review.interfaces";
import { withLayout } from "@/layout/layout";
import { Button, Headlines } from "@/components";
import { Case as ICase } from "@/interfaces/single/case.interface";
import { URL_CASE } from "@/constants/constants";
import { useRouter } from "next/router";
import { loaderImage } from "@/utils/image-loader/image-loader.utlis";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import axios from "axios";
import cn from "classnames";
import styles from "./style.module.scss";



function Case({ data }: CaseProps): JSX.Element {
    const route = useRouter();
    const [active, setActive] = useState(0);

    console.log(active);

    return (
        <>
            <main>
                <section className={styles.header}>
                    <div className={styles.headerWrapper}>
                        <Headlines tag='h1'>{data?.title ? data.title : ''}</Headlines>
                    </div>
                </section>
                <section className={styles.breadCrumb}>
                    <div className={styles.breadCrumbWrapper}>
                        <Breadcrumbs data={[{ title: 'Наши кейсы', path: '/cases/' }, { title: data.title, path: route.asPath }]} />
                    </div>
                </section>
                <section className={styles.content}>
                    <div className={styles.contentTitle}>
                        <Headlines tag="h2">{data.title}</Headlines>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.contentPhotoWrapper}>
                            {data.slider_images && data.slider_images.map((item, index) => (
                                <div key={index} className={cn({
                                    [styles.contentPhotoItemActive]: index === active,
                                    [styles.contentPhotoItemNonActive]: index !== active,
                                })}>
                                    <Image
                                        className={cn({
                                            [styles.contentPhotoItemActiveImage]: index === active,
                                            [styles.contentPhotoItemNonActiveImage]: index !== active,
                                        })}
                                        loader={() => loaderImage(item.url)}
                                        src={process.env.NEXT_PUBLIC_URL + item.url}
                                        width={item.width || 2400}
                                        height={item.height || 1252}
                                        alt={item.hash || ''}
                                    />
                                </div>
                            ))}
                            <div className={styles.contentPhotoSlider}>
                                <div className={styles.sliderWrapper}>
                                    <button className={cn(`${styles.sliderButton}, ${styles.sliderButtonLeft}`, {
                                        [styles.sliderButtonActive]: active !== data.slider_images.length,
                                        [styles.sliderButtonNonActive]: active === 0,
                                    })}
                                        onClick={() => active !== 0 ? setActive(active - 1) : setActive(0)}
                                    >
                                        <Image
                                            src='/arrowright.svg'
                                            width={25}
                                            height={25}
                                            alt='arrow right'
                                        />
                                    </button>
                                </div>
                                <div className={styles.sliderWrapper}>
                                    <button className={cn(`${styles.sliderButton}, ${styles.sliderButtonRight}`, {
                                        [styles.sliderButtonActive]: active >= 0,
                                        [styles.sliderButtonNonActive]: active === data.slider_images.length - 1,
                                    })}
                                        onClick={() => active < data.slider_images.length - 1 ? setActive(active + 1) : null}
                                    >
                                        <Image
                                            src='/arrowright.svg'
                                            width={25}
                                            height={25}
                                            alt='arrow right'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentDescription}>
                            <div className={styles.contentDescriptionText}>
                                <ReactMarkdown>{data?.description as string}</ReactMarkdown>
                            </div>
                            <div className={styles.contentDescriptionButton}>
                                <Button>Заказать услугу</Button>
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

export const getServerSideProps: GetServerSideProps<{ data: ICase }> = async (context) => {
    const { slug } = context.params as Params

    const response = await axios.get<ICase>(`${process.env.NEXT_PUBLIC_DOMAIN + URL_CASE}${slug}`).catch(error => {
        if (error.response?.status === 404) {
            return {
                notFound: true,
            }
        }
    })


    //@ts-ignore
    return response.data ? { props: { data: response.data } } : { notFound: true }
}

export interface CaseProps extends Record<string, unknown> {
    data: ICase
}

export default withLayout(Case);