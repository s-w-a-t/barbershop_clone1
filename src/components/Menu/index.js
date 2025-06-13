'use client'

import React from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import s from './Menu.module.scss'

gsap.registerPlugin(ScrollToPlugin)

const Menu = ({ data, variant, handleClose }) => {
  return (
    <ul className={clsx(s.menu, { [s[variant]]: variant })}>
      {data.map(({ name, link }, i) => {
        const handleScroll = (e) => {
          e.preventDefault()
          gsap.to(window, { scrollTo: link, ease: 'power2' })
          handleClose && handleClose()
        }
        return (
          <li key={name + i}>
            <a href={link} onClick={handleScroll} className={s.menu_link}>
              {name}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
