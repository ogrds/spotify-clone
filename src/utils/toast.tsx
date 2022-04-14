import toastHot from 'react-hot-toast'
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'

type Toast = {
  mode?: 'error' | 'warn' | 'success' | 'info' | 'default'
  message: string
}

export const toast = ({ mode, message }: Toast) => {
  let color = '',
    icon: null | React.ReactNode = null,
    colorMode = !mode ? 'default' : mode

  switch (colorMode) {
    case 'error':
      color = 'rgb(239 68 68)'
      icon = <ExclamationCircleIcon className="h-8 w-8" />
      break
    case 'warn':
      color = 'rgb(234 179 8)'
      icon = <ExclamationIcon className="h-8 w-8" />
      break
    case 'success':
      color = 'rgb(34 197 94)'
      icon = <CheckIcon className="h-8 w-8" />
      break
    case 'info':
      color = 'rgb(14 165 233)'
      icon = <InformationCircleIcon className="h-8 w-8" />
      break
    default:
      color = '#fff'
      break
  }

  return toastHot.custom((t) => (
    <div
      style={{ color }}
      className={`max-w-lg sm flex items-center space-x-3 rounded-lg bg-gray-900 px-6 py-4 shadow-md ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      {icon && <div>{icon}</div>}
      <div>{message}</div>
    </div>
  ))
}
