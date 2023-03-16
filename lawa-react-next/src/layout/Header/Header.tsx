import Image from 'next/image'
import { useState } from 'react'
import cn from 'classnames'

import { MenuComponent } from '@/components/Menu/Menu'

import { HeaderProps } from './Header.props'
import styles from './style.module.scss'


export const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.logo}>
          <Image
            priority
            src="/svg/logo.svg"
            width={130}
            height={30}
            alt="Logo"
          />
        </div>
        <div className={styles.headerContacts}>
          <Image
            priority
            src="/svg/mobile.svg"
            width={24}
            height={24}
            alt="Mobile"
          />
          <a href="tel: +375 (29) 305-65-58">+375 (29) 305-65-58</a>
        </div>
        <div className={styles.headerContacts}>
          <Image
            priority
            src="/svg/mail.svg"
            width={24}
            height={24}
            alt="Mail"
          />
          <a href="mailto: hello@lawa.by">hello@lawa.by</a>
        </div>
        <div className={styles.headerBurger}>
          <button className={cn(styles.headerBurgerButton, {
            [styles.headerBurgerActive]: activeMenu
          })} onClick={() => (activeMenu ? setActiveMenu(false) : setActiveMenu(true))}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={cn(styles.menu, {
          [styles.menuActive]: activeMenu
        })}>
          <MenuComponent />
        </div>
      </div>
    </header>
  )
}