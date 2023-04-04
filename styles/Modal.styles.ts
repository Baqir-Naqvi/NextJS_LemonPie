import { createGlobalStyle } from "styled-components"

const ModalStyles = createGlobalStyle`
  .modal-content {
    border: none;
    background-color: rgba(2, 34, 51, .95);
  }

  .modal-header {
    border-bottom-color: ${({ theme }) => theme.colors.lightBlue};
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: ${({ theme }) => theme.colors.ligthIndaco};

    .modal-title {
      font-size: 1.15rem;
    }
  }

  .modal-body {
    color: ${({ theme }) => theme.colors.dirtWhite};
  }

  .modal-footer {
    border-top-color: ${({ theme }) => theme.colors.lightBlue};
  }
`

export default ModalStyles