import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useReducer, useState } from 'react'
import cn from 'classnames'

import { menu } from '@/mock/mock.data'
import { Menu, MenuPropsItems } from '@/mock/mock.interfaces'

import { MenuProps } from './Menu.props'
import styles from './style.module.scss'

export const MenuComponent = ({ ...props }: MenuProps): JSX.Element => {

  const [active, setActive] = useState(false)
  const route = useRouter()


  const firstLevelMenu = (menu: Menu[]) => {
    return (
      <ul className={styles.first}>
        {menu.map((item, key) =>
          <li key={key} className={styles.firstItem}>
            <div className={styles.firstItemWrapper}>
              <Link href={item.link} className={cn({
                [styles.firstItemLink] : item.link == route.pathname
              })}>{item.name}</Link>
              {
                item.props &&
                                <button className={styles.firstItemButton} onClick={() => (active ? setActive(false) : setActive(true))}>
                                  <Image className={cn({
                                    [styles.secondLevelActiveImg]: active
                                  })} src="/arrowdown.svg" width={28} height={28} alt='arrow down' />
                                </button>
              }
              {item.props && item.props && secondLevelMenu(item.props, item.link)}
            </div>
          </li>
        )}
      </ul>
    )
  }

  const secondLevelMenu = (props: MenuPropsItems[], link: string) => {
    return (
      <ul className={cn(styles.second, {
        [styles.secondLevelActive]: active,
        [styles.secondLevelMenu]: !active
      })}>
        {props.map((item, key) =>
          <li key={key}>
            <Link href={'/' + link + '/' + item.link}>{item.name}</Link>
          </li>
        )}
      </ul>
    )
  }

  return (<>
    {firstLevelMenu(menu)}
  </>)
}