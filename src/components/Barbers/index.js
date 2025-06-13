'use client'

import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade, Autoplay } from 'swiper/modules'
import SwiperArrowButton from '../SwiperArrowButton'
import s from './Barbers.module.scss'

const Barbers = ({
  title,
  labelBase,
  labelUpper,
  labelTop,
  buttonText,
  list,
}) => {
  const LIST_BASE = list.filter((item) => item.level === 'base')
  const LIST_UPPER = list.filter((item) => item.level === 'upper')
  const LIST_TOP = list.filter((item) => item.level === 'top')

  const tabs = [
    {
      label: 'Всі',
      content: list,
    },
    {
      label: labelBase,
      content: LIST_BASE,
    },
    {
      label: labelUpper,
      content: LIST_UPPER,
    },
    {
      label: labelTop,
      content: LIST_TOP,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].label)
  const [activeList, setActiveList] = useState(list)

  const swiperRef = useRef(null)

  const goToFirstSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(0)
    }
  }

  const swiperParams = {
    updateOnWindowResize: true,
    modules: [Navigation],
    spaceBetween: 32,
    slidesPerView: 1,
    centeredSlides: false,
    navigation: {
      prevEl: '#swiper-prev-barbers',
      nextEl: '#swiper-next-barbers',
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        spaceBetween: 86,
        centeredSlides: true,
      },
      1024: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 32,
      },
    },
  }
  return (
    <section id="barbers" className={clsx('container', s.barbers)}>
      <div className={s.barbers_heading}>
        <h2 className="title-indent">{title}</h2>

        <div className={s.barbers_tabs}>
          {tabs.map(({ label, content }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setActiveTab(label)
                setActiveList(content)
                goToFirstSlide()
              }}
              disabled={label === activeTab}
              className={clsx(s.barbers_tab, {
                [s.active]: label === activeTab,
              })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.barbers_wrapper}>
        <Swiper ref={swiperRef} {...swiperParams} className={s.barbers_list}>
          {activeList.map(({ name, description, link, pics }, i) => (
            <SwiperSlide key={i} className={s.barbers_slide}>
              <div className={s.barbers_item}>
                <div className={s.barbers_media}>
                  {pics.length > 1 ? (
                    <Swiper
                      effect="fade"
                      autoplay={{
                        delay: 10000,
                      }}
                      allowTouchMove={false}
                      modules={[Autoplay, EffectFade]}
                      className={s.barbers_pics}
                    >
                      {pics.map(({ url, blurhash }, j) => (
                        <SwiperSlide key={j}>
                          <Image
                            src={url}
                            alt={name}
                            width={293}
                            height={392}
                            placeholder="blur"
                            blurDataURL={blurhash}
                            sizes="293px"
                            className={s.barbers_pic}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <Image
                      src={pics[0].url}
                      alt={name}
                      width={293}
                      height={392}
                      placeholder="blur"
                      blurDataURL={pics[0].blurhash}
                      sizes="293px"
                      className={s.barbers_pic}
                    />
                  )}
                </div>

                <span className={s.barbers_name}>{name}</span>
                <span className={s.barbers_descr}>{description}</span>

                {!!link && (
                  <a
                    href={link}
                    className={clsx('btn btn--primary', s.barbers_btn)}
                  >
                    {buttonText}
                  </a>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperArrowButton
          type="prev"
          variant="barbers"
          hidden={activeList.length < 2}
          className={clsx('aaaa', s.barbers_arrow, s.prev)}
        />
        <SwiperArrowButton
          type="next"
          variant="barbers"
          hidden={activeList.length < 2}
          className={clsx('aaaa', s.barbers_arrow, s.next)}
        />
      </div>
    </section>
  )
}

export default Barbers
