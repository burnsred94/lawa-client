import { URL_BLOG_PAGE } from "@/constants/constants";
import { BlogPage } from "@/interfaces/blog-page.interface";
import { withLayout } from "@/layout/layout"
import { NextSeo } from "next-seo"
import axios from "axios";
import styles from "./styles.module.scss"
import { Button, Headlines } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { Post } from "../../components/post/post.components";
import { useEffect, useState } from "react";
import { Navigation } from "../../components/navigation/nav.component";
import { Modal } from "@/components/Modal/Modal.component";
import { useRouter } from "next/router";
import Link from "next/link";

function BlogPage(): JSX.Element {
    const route = useRouter();
    const [keys, setKeys] = useState([0, 1, 3]);
    // const data = page[0]

    const [data, setData] = useState<BlogPage>()
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get<BlogPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_BLOG_PAGE);
                if (data) {
                    setData(data[0])
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [router.query])

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {/* {data?.seo !== null ?

                <NextSeo
                    title={data?.seo.title}
                    description={data?.seo.description}
                    canonical={URL_BLOG_PAGE}
                    openGraph={{
                        url: URL_BLOG_PAGE,
                        title: data?.seo.title,
                        description: data?.seo.description,
                        images: [
                            {
                                url: URL_BLOG_PAGE + data?.seo.image.url,
                                width: 1200,
                                height: 630
                            }
                        ]
                    }}
                /> : null} */}

            <main>

                {showModal && <Modal onClose={handleCloseModal} />}
                {data?.title_header !== null ?

                    <section className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <Headlines tag='h1'>{data?.title_header}</Headlines>
                        </div>
                    </section> :

                    null}

                {data?.title_header !== null ?

                    <section className={styles.breadCrumb}>
                        <div className={styles.breadCrumbWrapper}>
                            <Breadcrumbs data={[
                                { title: 'Блог', path: '/' + route.asPath.split('/').splice(0, 2).join('') }
                            ]} />
                        </div>
                    </section> :

                    null}
                {data?.posts !== null ?

                    <section className={styles.posts}>
                        <div className={styles.postsWrapper}>
                            {
                                data?.posts.map((post, index) => (
                                    <>
                                        <Link href={route.asPath + '/' + post.slug}>
                                            <Post data={post} />
                                        </Link>
                                    </>
                                ))
                            }
                        </div>
                        <div className={styles.postsNav}>
                            <Navigation keys={keys} />
                        </div>
                    </section> :

                    null}

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

    )
}

// export const getStaticProps = async () => {
//     const { data: page } = await axios.get<BlogPage[]>(process.env.NEXT_PUBLIC_DOMAIN + URL_BLOG_PAGE);

//     return {
//         props: {
//             page
//         },
//     };
// };

// export interface BlogProps extends Record<string, unknown> {
//     page: BlogPage[];
// }

export default withLayout(BlogPage)

