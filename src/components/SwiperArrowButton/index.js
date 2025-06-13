import React from 'react'
import clsx from 'clsx'
import ArrowRight from '@/assets/icons/arrow-right.svg'
import s from './SwiperArrowButton.module.scss'

const SwiperArrowButton = ({
  type,
  variant,
  withPagination,
  hidden,
  className,
}) => {
  return (
    <button
      id={`swiper-${type}-${variant}`}
      aria-label={type}
      className={clsx(
        `swiper-button-${type}`,
        s.btn,
        {
          [s.prev]: type === 'prev',
          [s.pagination]: withPagination,
          [s.hidden]: hidden,
        },
        className
      )}
    >
      <ArrowRight />
    </button>
  )
}

export default SwiperArrowButton
