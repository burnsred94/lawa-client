import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import styles from "./style.module.scss";


export const MapYandex = (): JSX.Element => {


    return (
        <YMaps>
            <div className={styles.container}>
                <Map className={styles.map} defaultState={{
                    center: [53.909148, 27.534361],
                    zoom: 17,
                    controls: ['zoomControl', 'fullscreenControl']
                }} modules={['control.ZoomControl', 'control.FullscreenControl']} >
                    <Placemark defaultGeometry={[53.909148, 27.534361]} />
                </Map>
            </div>
        </YMaps>
    );
};