import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
    </>
  )
}

export default ToastProvider
