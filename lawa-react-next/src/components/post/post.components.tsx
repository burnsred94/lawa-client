import Link from "next/link";
import { PostProps } from "./post.props";
import { loaderImage } from "@/utils/image-loader/image-loader.utlis";
import Image from 'next/image'
import styles from "./styles.module.scss";
import { Paragraph } from "@/components";

export function Post({ data, ...props }: PostProps): JSX.Element {


    return (
        <>
            <Link href={data.slug === null ? '' : data.slug}>
                <div className={styles.postContainer}>
                    <div className={styles.postImage}>
                        <Image priority loader={() => loaderImage(data.img.url)} src={process.env.NEXT_PUBLIC_DOMAIN + data.img.url} width={data.img.width} height={data.img.height} alt={data.img.hash} />
                    </div>
                    <div>
                        <div className={styles.postWrapper}>
                            <div className={styles.postText}>
                                <span className={styles.postTextTitle}>{data.title}</span>
                                <div className={styles.postTextDescription}>
                                    <Paragraph type='sub-title-text-dull'>{data.description}</Paragraph>
                                </div>
                                <span className={styles.postTextDate}>{`${data.createdAt.split('T')[0]}`}</span>
                            </div>
                            <div className={styles.postLink}>
                                <span className={styles.postLinkText}>Подробнее</span>
                                <Image
                                    src='/arrowright.svg'
                                    width={24}
                                    height={24}
                                    alt='arrow right'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}