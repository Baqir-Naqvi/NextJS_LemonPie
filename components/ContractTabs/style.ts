import styled from "styled-components"

const ContractTabsStyle = styled.section`
  .subscription-nav {
    margin-bottom: 1rem;
    align-items: center;
    border-color: ${({ theme }) => theme.colors.lightBlue};

    .nav-link {
      color: ${({ theme }) => theme.colors.ligthIndaco};
      cursor: pointer;
      padding: .75rem .66rem;

      .step-no {
        display: inline-flex;
        color: ${({ theme }) => theme.colors.oblivionBlue};
        background-color: ${({ theme }) => theme.colors.ligthIndaco};
        width: 23px;
        height: 23px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: .85rem;
        line-height: 1;

        @media (min-width: 768px) {
          margin-right: .5rem;
        }
      }

      .step-label {
        display: none;
        font-size: .85rem;

        @media (min-width: 768px) {
          display: inline-block;
        }
      }

      &:hover,
      &:active {
        border-color: ${({ theme }) => theme.colors.lightBlue} ${({ theme }) => theme.colors.lightBlue} transparent;
      }

      &.active {
        background-color: ${({ theme }) => theme.colors.darkBlue};
        border-color: ${({ theme }) => theme.colors.lightBlue} ${({ theme }) => theme.colors.lightBlue} transparent;
      }

      &.disabled {
        color: ${({ theme }) => theme.colors.darkGrey};

        .step-no {
          opacity: .5;
          border: 1px solid ${({ theme }) => theme.colors.ligthIndaco};
          background-color: transparent;
          color: ${({ theme }) => theme.colors.ligthIndaco};
        }
      }
    }
  }
`

export default ContractTabsStyle