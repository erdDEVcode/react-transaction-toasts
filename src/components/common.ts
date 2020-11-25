import _ from '../utils/lodash'

export interface ButtonProps {
  className?: string,
  onClick?: (e: any) => void,
  disabled?: boolean,
  icon?: string,
  title?: string,
  tooltip?: any,
  state?: string,
}

export interface ToastStyle {
  bgColor: string,
  textColor: string,
  iconColor: string,
}

export interface ToastStyles {
  error?: ToastStyle,
  pending?: ToastStyle,
  success?: ToastStyle,
}

export interface DefaultProps {
  styles?: ToastStyles,
  closeNow?: (e?: any) => void,
  closeAfter?: (delayMs: number) => void,
}

export const DEFAULT_STYLES = {
  error: {
    bgColor: '#f00',
    textColor: '#fff',
    iconColor: '#0ff',
  },
  pending: {
    bgColor: '#aff',
    textColor: '#000',
    iconColor: '#0ff',
  },
  success: {
    bgColor: '#93e9be',
    textColor: '#000',
    iconColor: '#0a0',
  },
}

export const getStyle = (obj: object, pth: string) => {
  return _.get(Object.assign({}, DEFAULT_STYLES, obj), pth)
}