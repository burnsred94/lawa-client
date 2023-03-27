import { loaderImage } from "@/utils/image-loader/image-loader.utlis"
import { Paragraph } from "@/components"
import Link from "next/link"
import Image from 'next/image'
import styles from "./style.module.scss"
import { CaseProps } from "./case.props"
import { useRouter } from "next/router"


export const Case = ({ data }: CaseProps) => {
    const route = useRouter()

    return (
        <>
            <Link href={data.link === null ? '' : `${route.asPath}/${data.link}`}>
                <div className={styles.postContainer}>
                    <div className={styles.postImage}>
                        <Image priority loader={() => loaderImage(data.image.url)} src={process.env.NEXT_PUBLIC_DOMAIN + data.image.url} width={data.image.width} height={data.image.height} alt={data.image.hash} />
                    </div>
                    <div>
                        <div className={styles.postWrapper}>
                            <div className={styles.postText}>
                                <div className={styles.postTextDescription}>
                                    <Paragraph type='sub-title-text-dull'>{data.description_preview}</Paragraph>
                                </div>
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
