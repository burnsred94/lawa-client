import { URL_CASE_PAGE } from "@/constants/constants";
import { CasePage } from "./interfaces/case-page.interfaces";
import { withLayout } from "@/layout/layout"
import { AssetService } from "@/services/AssetService";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Case } from "../../components/Case/case.components";
import { Button, Headlines, Paragraph } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Caveat } from '@next/font/google'
import cn from "classnames";
import styles from "./style.module.scss";
import axios from "axios";
import { Modal } from "@/components/Modal/Modal.component";
import { useState } from "react";


const caveat = Caveat({
    weight: ['400'],
    style: ['normal'],
    subsets: ['cyrillic', 'latin'],
})

function CasesPage({ page }: CasesProps): JSX.Element {
    const data = page[0];


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
            <main>
                {showModal && <Modal onClose={handleCloseModal} />}
                {data.title !== null ?

                    <section className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <Headlines tag='h1'>{data?.title ? data.title : ''}</Headlines>
                        </div>
                    </section> :

                    null}
                {data.title !== null ?

                    <section className={styles.breadCrumb}>
                        <div className={styles.breadCrumbWrapper}>
                            <Breadcrumbs data={[{ title: 'Наши кейсы', path: route.asPath }]} />
                        </div>
                    </section> :

                    null}
                {data.description !== null ?

                    <section className={cn(`${caveat.className}`, `${styles.description}`)} >
                        <div className={styles.descriptionText}>
                            <Paragraph className={`${caveat.className}`} type='normal-text'>
                                {data.description}
                            </Paragraph>
                        </div>
                    </section> :

                    null}

                {data.cases !== null ?

                    <section className={styles.services}>
                        <div className={styles.servicesWrapper}>
                            {
                                data.cases.map((post, index) => (
                                    <>
                                        <Case data={post} />
                                    </>
                                ))
                            }
                        </div>
                    </section> :

                    null}

                {data.questions !== null ?

                    <section className={styles.questions}>
                        <div className={styles.questionsWrapper}>
                            <div>
                                <Headlines tag='h3'>{data?.questions.title}</Headlines>
                                <Button init='button' onClick={() => handleOpenModal()}>{data?.questions.link}</Button>
                            </div>
                        </div>

                    </section>

                    : null}
            </main>
        </>
    )
}




export const getStaticProps = async () => {
    const { data: page } = await axios.get<CasePage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_CASE_PAGE);

    return {
        props: {
            page
        },
    };
};

export interface CasesProps extends Record<string, unknown> {
    page: CasePage[];
}

export default withLayout(CasesPage)