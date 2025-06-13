import React from 'react'
import clsx from 'clsx'
import s from './CTA.module.scss'

const CTA = ({ title, descr, btnText, btnLink }) => {
  return (
    <section className={clsx('container', s.cta)}>
      <h2 className={clsx('h2', s.cta_title)}>{title}</h2>

      <p className={s.cta_descr}>{descr}</p>

      <a
        href={btnLink}
        target="_blank"
        rel="noopener nofollow noreferrer"
        className={clsx('btn btn--secondary', s.cta_btn)}
      >
        {btnText}
      </a>
    </section>
  )
}

export default CTA
