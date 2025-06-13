export const onAutoplayTimeLeft = (progress, container) => {
  if (!container) return

  container.style.setProperty('--animation-progress', (1 - progress).toString())
}
