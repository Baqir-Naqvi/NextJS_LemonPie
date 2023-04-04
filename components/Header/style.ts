import styled from "styled-components"

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  box-shadow: 0 0px 15px -3px #000;
  padding: .5rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #000;
`

export default HeaderStyle