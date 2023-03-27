import { ButtonProps } from './Button.props'
import styles from './style.module.scss'


export const Button = ({ className, children, init, link, ...props }: ButtonProps): JSX.Element => {

  switch (init) {
    case 'button':
      return <button className={styles.button} {...props}>{children}</button>
    case 'link':
      return <a href={link} className={styles.button}>{children}</a>
  }

}