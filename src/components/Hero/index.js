'use client'

import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  Pagination,
  Navigation,
  Thumbs,
  EffectFade,
} from 'swiper/modules'
import { onAutoplayTimeLeft } from '@/utils/onAutoplayTimeLeft'
import ArrowRight from '@/assets/icons/arrow-right.svg'
import Lines from '../Lines'
import s from './Hero.module.scss'

const Hero = ({ orderLabel, orderLink, title, label, pics }) => {
  const containerRef = useRef(null)

  const thumbs = pics.slice(1).concat(pics[0])

  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const swiperMainParams = {
    updateOnWindowResize: true,
    modules: [Autoplay, Pagination, Navigation, Thumbs, EffectFade],
    effect: 'fade',
    allowTouchMove: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '#swiper-pagination-hero',
      type: 'bullets',
    },
    navigation: {
      prevEl: '#swiper-prev-hero',
      nextEl: '#swiper-next-hero',
    },
  }

  const swiperThumbParams = {
    updateOnWindowResize: true,
    modules: [Thumbs, EffectFade],
    effect: 'fade',
    allowTouchMove: false,
    loop: true,
  }
  return (
    <section ref={containerRef} className={s.hero}>
      <div className={s.hero_wrapper}>
        <span className={s.hero_label}>{label}</span>

        <Swiper
          {...swiperMainParams}
          onAutoplayTimeLeft={(_, __, progress) =>
            onAutoplayTimeLeft(progress, containerRef.current)
          }
          thumbs={{ swiper: thumbsSwiper }}
          className={s.hero_pics}
        >
          {pics.map(({ url, basename, alt, blurhash }, i) => (
            <SwiperSlide key={i}>
              <Image
                width={1440}
                height={1080}
                priority
                placeholder="blur"
                blurDataURL={blurhash}
                sizes="(max-width: 739.98px) 93vw, 100vw"
                src={url}
                alt={alt || basename}
                className={clsx(s.hero_pic, s.main)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={s.hero_nav}>
        <button
          id="swiper-prev-hero"
          type="button"
          aria-label="prev"
          className={clsx(s.hero_nav_item, s.prev)}
        >
          <ArrowRight />
        </button>
        <button
          id="swiper-next-hero"
          type="button"
          aria-label="next"
          className={s.hero_nav_item}
        >
          <ArrowRight />
        </button>
      </div>

      <div className={clsx('container', s.hero_inner)}>
        <h1 className={s.hero_title}>{title}</h1>

        <Swiper
          {...swiperThumbParams}
          onSwiper={setThumbsSwiper}
          onAutoplayTimeLeft={(_, __, progress) =>
            onAutoplayTimeLeft(progress, containerRef.current)
          }
          className={s.hero_thumbs}
        >
          {thumbs.map(({ url, basename, alt, blurhash }, j) => (
            <SwiperSlide key={j}>
              <Image
                width={375}
                height={234}
                sizes="375px"
                loading="eager"
                placeholder="blur"
                blurDataURL={blurhash}
                src={url}
                alt={alt || basename}
                className={clsx(s.hero_pic, s.thumbs)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx('btn btn--primary', s.hero_cta)}
        >
          {orderLabel}
        </a>

        <div id="swiper-pagination-hero" className={s.hero_pagination} />
      </div>

      <Lines className={s.hero_lines} />
    </section>
  )
}

export default Hero
