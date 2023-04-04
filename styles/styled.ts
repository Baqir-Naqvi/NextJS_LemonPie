// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      blue: string
      azure: string
      white: string
      grey: string
      dirtWhite: string
      darkGrey: string
      lightGrey: string
      black: string
      violet: string
      orange: string
      ligthIndaco: string
      green: string
      transparentGreen: string
      lightGreen: string
      yellow: string
      lightBlue: string
      darkBlue: string
      oblivionBlue: string
      red: string

      links: {
        main: string
        hover: string
        focus: string
      }
    }

    boxShadow: string
    inputBoxShadow: string
  }
}