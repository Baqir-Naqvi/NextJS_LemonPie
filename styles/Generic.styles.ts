import { createGlobalStyle } from "styled-components"

const GenericStyles = createGlobalStyle`
  body {
    font-family: "Assistant", sans-serif;
  }
  
  .spin-animation {
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  b, strong {
    font-weight: bold;
  }

  .fa-door-open {
    color: ${({ theme }) => theme.colors.violet};
  }

  .fa-file-check {
    color: ${({ theme }) => theme.colors.ligthIndaco};
  }

  .fa-clock {
    color: ${({ theme }) => theme.colors.yellow};
  }

  .fa-signature {
    color: ${({ theme }) => theme.colors.orange};
  }

  .fa-copy {
    color: ${({ theme }) => theme.colors.lightGrey};
  }

  .fa-circle-xmark {
    color: ${({ theme }) => theme.colors.red};
  }
`

export default GenericStyles