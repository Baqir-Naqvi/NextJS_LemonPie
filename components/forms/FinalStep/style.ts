import styled from "styled-components"

const FinalStepStyle = styled.section`
  color: ${({ theme }) => theme.colors.white};
  padding: 2.5rem;

  header {
    display: flex;
    align-items: center;

    h1 {
      font-weight: 600;
      margin-bottom: 0;
      margin-left: 1rem;
    }

    svg {
      color: ${({ theme }) => theme.colors.green};
      font-size: 3rem;
    }
  }

  main {
    margin: 2.5rem 0;
  }
`

export default FinalStepStyle