'use client'

import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import SwiperArrowButton from '../SwiperArrowButton'
import useMatchMedia from '@/hooks/useMatchMedia'
import Popup from '../Popup'
import ProductMore from './components/ProductMore'
import s from './Products.module.scss'

const Products = ({ title, buttonText, footnote, list }) => {
  const isMobile = useMatchMedia('(max-width: 739.98px)')

  const swiperParams = {
    updateOnWindowResize: true,
    modules: [Navigation, Pagination],
    spaceBetween: 9,
    slidesPerView: 'auto',
    pagination:
      list.length > 4 || (list.length > 2 && isMobile)
        ? {
            clickable: true,
          }
        : false,
    navigation: {
      prevEl: '#swiper-prev-products',
      nextEl: '#swiper-next-products',
    },
    breakpoints: {
      480: {
        spaceBetween: 32,
      },
    },
  }
  return (
    <section className={clsx('container', s.products)}>
      <h2 className="title-indent">{title}</h2>

      <div
        className={clsx(s.products_wrapper, {
          [s.pagination]: list.length > 4,
        })}
      >
        <Swiper {...swiperParams} className={s.products_list}>
          {list.map(({ name, label, description, pic }, i) => (
            <SwiperSlide key={i} className={s.products_item}>
              <div
                className={clsx(s.products_media, {
                  [s.bg]: !!description,
                })}
              >
                <Image
                  src={pic.url}
                  alt={name}
                  placeholder="blur"
                  blurDataURL={pic.blurhash}
                  fill
                  sizes="(max-width: 739.98px) 167px, 283px"
                  className={s.products_pic}
                />
              </div>

              <span className={s.products_title}>{name}</span>
              <span className={s.products_label}>{label}</span>

              {description && (
                <Popup
                  variant="product"
                  triger={
                    <button
                      type="button"
                      className={clsx('btn btn--secondary', s.products_btn)}
                    >
                      {buttonText}
                    </button>
                  }
                >
                  <ProductMore
                    title={name}
                    label={label}
                    pic={pic}
                    descr={description}
                    footnote={footnote}
                  />
                </Popup>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperArrowButton
          type="prev"
          variant="products"
          withPagination
          hidden={isMobile || list.length < 5}
        />
        <SwiperArrowButton
          type="next"
          variant="products"
          withPagination
          hidden={isMobile || list.length < 5}
        />
      </div>
    </section>
  )
}

export default Products
