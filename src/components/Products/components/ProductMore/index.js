import React from 'react'
import Image from 'next/image'
import s from './ProductMore.module.scss'

const ProductMore = ({ title, label, pic, descr, footnote }) => {
  return (
    <div className={s.productMore}>
      <span className={s.productMore_title}>{title}</span>

      <span className={s.productMore_label}>{label}</span>

      <Image
        src={pic.url}
        alt={title}
        placeholder="blur"
        blurDataURL={pic.blurhash}
        width={220}
        height={313}
        className={s.productMore_pic}
      />

      <p className={s.productMore_descr}>{descr}</p>

      {footnote && <p className={s.productMore_footnote}>{footnote}</p>}
    </div>
  )
}

export default ProductMore
