import { Dimensions } from 'react-native'

export const domain = 'https://www.iplayulisten.com'
export const logo = require('../assets/images/iPlay2020Logo.png')
export const siteLogo = 'https://www.iplayulisten.com/ipul-logo-2020.png'
export const { width, height } = Dimensions.get('window')
export const truncate = (val, size) => {
  if (!val) return
  return (
    Object.keys(val).length > size ? val.slice(0, size) + '...' : val
  )
}
