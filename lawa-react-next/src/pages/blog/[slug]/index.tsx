import { Modal } from "@/components/Modal/Modal.component";
import { URL_POST } from "@/constants/constants";
import { withLayout } from "@/layout/layout"
import { AssetService } from "@/services/AssetService";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import styles from './styles.module.scss'
import { Button, Headlines, Paragraph } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { PostPage } from "@/interfaces/post-page.interfaces";
import ReactMarkdown from "react-markdown";
import { loaderImage } from "@/utils/image-loader/image-loader.utlis";
import Image from "next/image";
import { ScrollToTopButton } from "@/components/ScrollButton/ScrollButton.component";


function Post(): JSX.Element {
    const route = useRouter();
    const [active, setActive] = useState(0);
    const [data, setData] = useState<PostPage>();

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                if (route.query.slug) {
                    const { data } = await axios.get<PostPage>(process.env.NEXT_PUBLIC_DOMAIN + URL_POST + route.query.slug);
                    setData(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [route.query])

    const link = `https://lawa.by${route.asPath}`
    const canonicalLink = link.includes('?') ? link.substring(0, link.indexOf('?')) : link
    const assetService = new AssetService({ assetsBase: process.env.NEXT_PUBLIC_DOMAIN as string })

    return (
        <>
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
                        <Breadcrumbs data={[{ title: "Блог", path: '/blog' }, { title: data?.title as string, path: route.asPath }]} />
                    </div>
                </section> :

                null}

            {data?.title !== null && data?.description !== null ?

                <section className={styles.result}>
                    <div className={styles.resultWrapper}>
                        {data?.img !== null ?
                            <div className={styles.resultImages}>
                                <div className={styles.resultImagesLeft}>
                                    {data?.img !== undefined ? <Image
                                        loader={() => loaderImage(data?.img.url as string)}
                                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.img.url}`}
                                        width={270}
                                        height={470}
                                        alt="left" /> : null}
                                </div>
                            </div>
                            : null}
                        <div className={styles.resultList}>
                            <div className={styles.resultTitle}>
                                <Headlines tag="h2">
                                    {data && data.title}
                                </Headlines>
                                <div className={styles.date}>
                                    <Paragraph type="sub-title-text-dull">{data?.date}</Paragraph>
                                </div>
                                <Button init='button' onClick={() => handleOpenModal()}>Заказать услугу</Button>
                            </div>
                        </div>
                        <div className={styles.resultDescription}>
                            <ReactMarkdown className={styles.resultListDescription}>{data?.description as string}</ReactMarkdown>
                        </div>
                    </div>
                </section > :
                null
            }


            <section className={styles.questions}>
                <div className={styles.questionsWrapper}>
                    <div>
                        <Headlines tag='h3'>{'Остались вопросы?'}</Headlines>
                        <Button init='button' onClick={() => handleOpenModal()}>{'Давайте обсудим'}</Button>
                    </div>
                </div>

            </section>


        </>
    )
}

export default withLayout(Post)