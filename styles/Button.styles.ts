import { createGlobalStyle } from "styled-components"

const ButtonStyles = createGlobalStyle`
  button, .btn {
    font-weight: 700;

    svg[class*="fa-"] {
      color: inherit !important;
    }

    &.btn-link {
      color: ${({ theme }) => theme.colors.green};
    }
  }
`

export default ButtonStyles