import { loaderImage } from "@/utils/image-loader/image-loader.utlis";
import { SliderProps } from "./Slider.props";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.scss"

export const SliderAuto = ({ data }: SliderProps): JSX.Element => {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <>
            <Slider {...settings}>
                {data !== null ? data.map((item, index) => (
                    <div key={item.id}>
                        <div className={styles.wrapper} key={item.id}>
                            <Image key={item.id} width={200} height={150} alt="slider_image" src={`${process.env.NEXT_PUBLIC_DOMAIN}${item.url}`} />
                        </div>

                    </div>
                )
                ) : null}
            </Slider>
        </>
    )
}