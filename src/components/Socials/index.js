import React from 'react'
import Instagram from '@/assets/icons/instagram.svg'
import Telegram from '@/assets/icons/telegram.svg'
import clsx from 'clsx'
import s from './Socials.module.scss'

const Socials = ({ instagram, telegram, variant, className }) => {
  const DATA = [
    {
      name: 'Instagram',
      Icon: Instagram,
      link: instagram,
    },
    {
      name: 'Telegram',
      Icon: Telegram,
      link: telegram,
    },
  ]
  return (
    <ul className={clsx(s.socials, { [s[variant]]: variant }, className)}>
      {DATA.filter((item) => !!item.link).map(({ name, Icon, link }, i) => (
        <li key={i}>
          <a
            href={link}
            target="_blank"
            rel="noopener nofollow noreferrer"
            aria-label={name}
            className={s.socials_link}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Socials
