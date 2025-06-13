'use client'
import React from 'react'
import clsx from 'clsx'
import useMatchMedia from '@/hooks/useMatchMedia'
import * as Accordion from '@radix-ui/react-accordion'
import s from './Services.module.scss'

const Services = ({ title, labelBase, labelUpper, labelTop, list }) => {
  const isDesktop = useMatchMedia('(min-width: 1200px)')
  return (
    <section id="services" className={clsx('container', s.services)}>
      <h2 className="title-indent">{title}</h2>

      <Accordion.Root type="single" collapsible className={s.services_list}>
        {list.map(({ name, basePrice, upperPrice, topPrice }, i) => (
          <Accordion.Item
            disabled={isDesktop}
            key={name + i}
            value={name + i}
            className={s.services_item}
          >
            <Accordion.Trigger className={s.services_name}>
              {name}
            </Accordion.Trigger>

            <Accordion.Content
              forceMount={isDesktop}
              className={s.services_price}
            >
              <div data-label={labelBase} className={s.services_price_item}>
                <span className={s.services_price_value}>{basePrice} грн</span>
              </div>
              <div data-label={labelUpper} className={s.services_price_item}>
                <span className={s.services_price_value}>{upperPrice} грн</span>
              </div>
              <div data-label={labelTop} className={s.services_price_item}>
                <span className={s.services_price_value}>{topPrice} грн</span>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}

export default Services
