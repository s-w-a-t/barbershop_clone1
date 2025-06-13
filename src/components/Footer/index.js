import React from 'react'
import clsx from 'clsx'
import Logo from '../Logo'
import Menu from '../Menu'
import Socials from '../Socials'
import s from './Footer.module.scss'

const Footer = ({ instagram, telegram, logo, menu, copy }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={clsx('container', s.footer)}>
      <Logo pic={logo} variant="footer" />

      <Socials instagram={instagram} telegram={telegram} variant="footer" />

      <Menu data={menu} variant="footer" />

      <p className={s.footer_copy}>
        © {currentYear} {copy}
      </p>
    </footer>
  )
}

export default Footer
