import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { onAutoplayTimeLeft } from '@/utils/onAutoplayTimeLeft'
import Popup from '@/components/Popup'
import s from './GalleryItem.module.scss'

const GalleryItem = ({ pic, index, data, setPlay }) => {
  const containerRef = useRef(null)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setPlay(!open)
  }, [open])

  const swiperParams = {
    updateOnWindowResize: true,
    modules: [Autoplay, Pagination, Navigation, EffectFade],
    effect: 'fade',
    navigation: true,
    rewind: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      type: 'bullets',
    },
  }

  return (
    <Popup
      variant="slider"
      triger={
        <button className={s.item}>
          <Image
            src={pic.url}
            alt={pic.alt || pic.basename}
            placeholder="blur"
            blurDataURL={pic.blurhash}
            fill
            sizes="324px"
            className={s.item_pic}
          />
        </button>
      }
      open={open}
      setOpen={setOpen}
    >
      <Swiper
        ref={containerRef}
        {...swiperParams}
        initialSlide={index}
        onAutoplayTimeLeft={(_, __, progress) =>
          onAutoplayTimeLeft(progress, containerRef.current)
        }
        className={s.item_slider}
      >
        {data.map((item, j) => (
          <SwiperSlide key={+index + j} className={s.item_slide}>
            <div className={s.item_slideMedia}>
              <Image
                src={item.url}
                alt={item.alt || item.basename}
                placeholder="blur"
                blurDataURL={item.blurhash}
                fill
                sizes="(max-width: 739.98px) calc(100vw - 64px), 624px"
                className={s.item_slidePic}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Popup>
  )
}

export default GalleryItem
