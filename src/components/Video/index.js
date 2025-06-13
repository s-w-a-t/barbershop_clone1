import React from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import s from './Video.module.scss'

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

const Video = ({ className, ...rest }) => {
  return (
    <ReactPlayer
      {...rest}
      width="100%"
      height="100%"
      className={clsx(
        s.video,
        { [s.disable]: !!rest.playing && !rest.light },
        className
      )}
    />
  )
}

export default Video
