'use client'

import React from 'react'
import clsx from 'clsx'
import { formatDate } from '@/utils/formatDate'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import useMatchMedia from '@/hooks/useMatchMedia'
import Star from '@/assets/icons/star.svg'
import SwiperArrowButton from '../SwiperArrowButton'
import s from './Reviews.module.scss'

const Reviews = ({ title, list }) => {
  const isMobile = useMatchMedia('(max-width: 739.98px)')

  const swiperParams = {
    updateOnWindowResize: true,
    modules: [Navigation, Pagination],
    spaceBetween: 60,
    slidesPerView: 1,
    pagination:
      list.length > 2 || (list.length > 1 && isMobile)
        ? {
            clickable: true,
          }
        : false,
    navigation: {
      prevEl: '#swiper-prev-reviews',
      nextEl: '#swiper-next-reviews',
    },
    breakpoints: {
      740: {
        slidesPerView: 'auto',
      },
    },
  }

  const shortName = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)

  return (
    <section className={clsx('container', s.reviews)}>
      <h2 className={clsx('title-indent')}>{title}</h2>

      <div
        className={clsx(s.reviews_wrapper, {
          [s.pagination]: list.length > 2,
        })}
      >
        <Swiper {...swiperParams} className={s.reviews_list}>
          {list
            .filter((item) => item.rating === 5)
            .map(({ author_name, text, rating, time }, i) => {
              return (
                <SwiperSlide key={i} className={s.reviews_item}>
                  <div className={s.reviews_heading}>
                    <div className={s.reviews_media}>
                      {shortName(author_name)}
                    </div>

                    <div className={s.reviews_author}>
                      <span className={s.reviews_name}>{author_name}</span>
                      <ul className={s.reviews_rating}>
                        {[...Array(5)].map((_, i) => {
                          return (
                            <li
                              key={i}
                              className={clsx(s.reviews_star, {
                                [s.empty]: rating <= i,
                              })}
                            >
                              <Star />
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <span className={s.reviews_date}>{formatDate(time)}</span>
                  </div>

                  <p className={s.reviews_text}>{text}</p>
                </SwiperSlide>
              )
            })}
        </Swiper>
        <SwiperArrowButton
          type="prev"
          variant="reviews"
          withPagination
          hidden={isMobile || list.length < 3}
        />
        <SwiperArrowButton
          type="next"
          variant="reviews"
          withPagination
          hidden={isMobile || list.length < 3}
        />
      </div>
    </section>
  )
}

export default Reviews
