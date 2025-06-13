import React from 'react'
import clsx from 'clsx'
import * as Dialog from '@radix-ui/react-dialog'
import s from './Popup.module.scss'

const Popup = ({ variant, triger, children, open, setOpen }) => {
  const isSlider = variant === 'slider'

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{triger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={clsx(s.overlay, { [s[variant]]: variant })}>
          <Dialog.Content className={clsx(s.popup, { [s[variant]]: variant })}>
            {isSlider && (
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className={s.popup_close}
                />
              </Dialog.Close>
            )}

            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Popup
