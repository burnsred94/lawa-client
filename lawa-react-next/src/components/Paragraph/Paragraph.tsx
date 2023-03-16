import { ParagraphProps } from './Paragraph.props'
import styles from './style.module.scss'


export const Paragraph = ({type, children}: ParagraphProps): JSX.Element => {
  switch (type) {
  case 'dull-text':
    return <p className={styles.dullText}>{children}</p>
  case 'normal-text':
    return <p className={styles.normalText}>{children}</p>
  case 'sub-title-text-normal':
    return <p className={styles.subTitleTextNormal}>{children}</p>
  case 'sub-title-text-dull':
    return <p className={styles.subTitleTextDull}>{children}</p>
  default: return <p>{children}</p>
  }
}