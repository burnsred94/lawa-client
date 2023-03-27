

import { NavProps } from './nav.props'
import styles from './style.module.scss'

export const Navigation = ({ keys }: NavProps): JSX.Element => {
    return (
        <>
            <div className={styles.container}>
                <button className={styles.navButton}>Предыдущая</button>
                <div className={styles.navWrapper}>
                    {keys.map((key, index) => (
                        <div key={index} className={styles.navKeys}>
                            {`${key}`}
                        </div>
                    ))}
                </div>
                <button className={styles.navButton}>Следующая</button>
            </div>
        </>
    )
}

