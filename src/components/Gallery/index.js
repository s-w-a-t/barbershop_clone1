'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import Marquee from 'react-fast-marquee'
import GalleryItem from './component'
import s from './Gallery.module.scss'

const Gallery = ({ title, pics }) => {
  const [play, setPlay] = useState(false)
  return (
    <section id="gallery" className={clsx('container', s.gallery)}>
      <h2 className="title-indent">{title}</h2>

      <div className={s.gallery_wrapper}>
        <Marquee
          autoFill
          play={play}
          gradient
          gradientColor="#000"
          gradientWidth={16}
        >
          <div className={s.gallery_list}>
            {pics.map((item, i) => (
              <GalleryItem
                key={i}
                index={i}
                pic={item}
                data={pics}
                setPlay={setPlay}
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}

export default Gallery
