'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Logo from '../Logo'
import Menu from '../Menu'
import clsx from 'clsx'
import s from './Header.module.scss'

const BtnCta = ({ orderLabel, orderLink, handleClose, className }) => (
  <a
    href={orderLink}
    target="_blank"
    rel="noopener noreferrer"
    onClick={handleClose ? handleClose : null}
    className={clsx('btn btn--primary', s.header_btn, className)}
  >
    {orderLabel}
  </a>
)

const Header = ({ logo, menu, orderLabel, orderLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleToggle = () => {
    setIsMenuOpen((prevState) => !prevState)
    document.body.style.overflow = isMenuOpen ? '' : 'hidden'
  }

  const handleClose = () => {
    if (window.innerWidth >= 1200) return
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1200 && isMenuOpen) {
      setIsMenuOpen(false)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen, handleResize])

  return (
    <header className={clsx('container', s.header)}>
      <Logo pic={logo} variant="header" isPriority />

      <nav className={clsx(s.header_nav, { [s.show]: isMenuOpen })}>
        <Menu data={menu} variant="header" handleClose={handleClose} />

        <BtnCta
          orderLabel={orderLabel}
          orderLink={orderLink}
          className={s.mobile}
          handleClose={handleClose}
        />
      </nav>

      <BtnCta
        orderLabel={orderLabel}
        orderLink={orderLink}
        className={s.desktop}
      />

      <button
        type="button"
        aria-label="Menu"
        onClick={handleToggle}
        className={clsx(s.header_hamb, { [s.active]: isMenuOpen })}
      >
        <span className={s.header_hamb_icon} />
      </button>
    </header>
  )
}

export default Header
