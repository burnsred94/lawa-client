import { URL_REVIEW_PAGE } from "@/constants/constants";
import { withLayout } from "@/layout/layout"
import { AssetService } from "@/services/AssetService";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReviewPage } from "./interfaces/reviews-page.interfaces";
import { Button, Headlines } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Service } from "@/components/service/Service";
import axios from "axios";
import styles from './style.module.scss'
import { Modal } from "@/components/Modal/Modal.component";
import { useEffect, useState } from "react";



function Reviews(): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<ReviewPage>()
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get<ReviewPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_REVIEW_PAGE);
                if (data) {
                    setData(data[0])
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [router.query])

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
            <main>
                {showModal && <Modal onClose={handleCloseModal} />}

                {data?.title !== null ?

                    <section className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <Headlines tag='h1'>{data?.title ? data.title : ''}</Headlines>
                        </div>
                    </section> :

                    null}

                {data?.title !== null ?

                    <section className={styles.breadCrumb}>
                        <div className={styles.breadCrumbWrapper}>
                            <Breadcrumbs data={[{ title: 'Наши отзывы', path: route.asPath }]} />
                        </div>
                    </section> :

                    null}

                {data?.reviews !== null ?

                    <section className={styles.services}>
                        <Headlines tag='h2'>{data?.title ? data.title : ''}</Headlines>
                        <div className={styles.servicesWrapper}>
                            {
                                data?.reviews.map((item, index) => (
                                    <>
                                        <Service type='card-review' link={item.link} text={item.description} img={item.logo} />
                                    </>
                                ))
                            }
                        </div>
                    </section> :

                    null}

                {data ?

                    <section className={styles.questions}>
                        <div className={styles.questionsWrapper}>
                            <div>
                                <Headlines tag='h3'>Остались вопросы?</Headlines>
                                <Button init='button' onClick={() => handleOpenModal()}>Давайте обсудим</Button>
                            </div>
                        </div>

                    </section> :

                    null}

            </main>
        </>
    )
}


// export const getServerSideProps = async () => {
//     const { data: page } = await axios.get<ReviewPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_REVIEW_PAGE);
//     return {
//         props: {
//             page
//         },
//     };
// };

// export interface ReviewsProps extends Record<string, unknown> {
//     page: ReviewPage[];
// }

export default withLayout(Reviews)