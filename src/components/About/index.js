'use client'

import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import Video from '../Video'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { onAutoplayTimeLeft } from '@/utils/onAutoplayTimeLeft'
import s from './About.module.scss'

const About = ({ title, descr, video, pics, brands }) => {
  const containerRef = useRef(null)
  const [play, setPlay] = useState(false)

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    const currentSectionRef = sectionRef.current

    if (currentSectionRef) {
      observer.observe(currentSectionRef)
    }
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef)
      }
    }
  }, [])

  const swiperParams = {
    updateOnWindowResize: true,
    modules: [Autoplay, Pagination],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    rewind: true,
    spaceBetween: 16,
    slidesPerView: 'auto',
    pagination: {
      type: 'bullets',
    },
  }
  return (
    <section ref={sectionRef} id="about" className={clsx('container', s.about)}>
      <div className={s.about_inner}>
        <h2 className={s.about_title}>{title}</h2>

        <p className={s.about_descr}>{descr}</p>

        <div className={s.about_video}>
          {isVisible && (
            <Video
              url={video.url}
              autoPlay
              playsInline
              playing={play}
              muted
              onReady={() => setPlay(true)}
            />
          )}
        </div>

        <div
          ref={containerRef}
          className={clsx(s.about_gallery, { [s.wide]: pics.length > 1 })}
        >
          <Swiper
            {...swiperParams}
            onAutoplayTimeLeft={(_, __, progress) =>
              onAutoplayTimeLeft(progress, containerRef.current)
            }
            className={s.about_list}
          >
            {pics.map(({ url, basename, blurhash, alt }, i) => (
              <SwiperSlide key={i} className={s.about_media}>
                <Image
                  src={url}
                  alt={alt || basename}
                  fill
                  placeholder="blur"
                  blurDataURL={blurhash}
                  sizes="(max-width: 739.98px) 278px, 405px"
                  className={s.about_pic}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className={s.about_brands}>
        <Marquee>
          {brands.map(({ url, basename, alt, width, height, blurhash }, i) => (
            <Image
              key={i}
              width={width || 220}
              height={height || 128}
              placeholder="blur"
              blurDataURL={blurhash}
              src={url}
              alt={alt || basename}
              className={s.about_logo}
            />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default About
