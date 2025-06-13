'use client'
import { useEffect, useState } from 'react'

const useMatchMedia = (query) => {
  const [mQuery, setMQuery] = useState({
    matches:
      typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    mediaQuery.addEventListener('change', setMQuery)

    return () => mediaQuery.removeEventListener('change', setMQuery)
  }, [query])

  return mQuery?.matches
}

export default useMatchMedia
