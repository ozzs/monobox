import { createContext } from 'react'

interface ThemeContextInterface {
  theme: string
  background: string
  primary: string
  author: string
  icon: string
  white: string
  black: string
}
const themeContext = createContext({} as ThemeContextInterface)

export default themeContext
