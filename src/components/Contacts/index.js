import React from 'react'
import clsx from 'clsx'
import { GoogleMapsEmbed } from '@next/third-parties/google'
import Socials from '../Socials'
import s from './Contacts.module.scss'

const Contacts = ({ telegram, instagram, title, map }) => {
  return (
    <section id="contacts" className={clsx('container', s.contacts)}>
      <h2 className={s.contacts_title}>{title}</h2>
      <Socials
        telegram={telegram}
        instagram={instagram}
        variant="contacts"
        className={s.contacts_socials}
      />
      <iframe
        title="Map"
        src={map}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={s.contacts_map}
      />
    </section>
  )
}

export default Contacts
