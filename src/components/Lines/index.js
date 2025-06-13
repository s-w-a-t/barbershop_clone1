import React from 'react'
import clsx from 'clsx'
import s from './Lines.module.scss'

const Lines = ({ className }) => {
  return <span className={clsx(s.lines, className)} />
}

export default Lines
