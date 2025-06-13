'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Video from '../Video'
import Play from '@/assets/icons/play.svg'
import Popup from '../Popup'
import s from './School.module.scss'

const School = ({ title, descr, video, pics }) => {
  const [play, setPlay] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <section id="school" className={clsx('container', s.school)}>
      <h2 className={s.school_title}>{title}</h2>

      <p className={s.school_descr}>{descr}</p>

      <div className={s.school_media}>
        <Video
          url={video.url}
          light={video.thumbnailUrl || true}
          autoPlay
          playsInline
          playing
          muted
          controls
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
          onEnded={() => setPlay(false)}
          onClickPreview={() => setActive(true)}
          playIcon={<Play />}
        />

        {!!pics.length && (
          <Popup
            variant="school"
            triger={
              <button
                className={clsx('btn btn--secondary', s.school_btn, {
                  [s.hidden]: play,
                  [s.active]: active,
                })}
              >
                Детальніше
              </button>
            }
          >
            <div className={clsx('container', s.school_gallery)}>
              {pics.map(({ url, basename, blurhash, alt }, i) => (
                <div key={i} className={s.school_ill}>
                  <Image
                    src={url}
                    alt={alt || basename}
                    placeholder="blur"
                    blurDataURL={blurhash}
                    fill
                    className={s.school_pic}
                  />
                </div>
              ))}
            </div>
          </Popup>
        )}
      </div>
    </section>
  )
}

export default School
