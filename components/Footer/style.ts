import styled from "styled-components"

import Bkg from '../../public/wave-bkg.svg'

const FooterStyle = styled.footer`
  min-height: 300px;
  padding: 2.5rem;
  color: ${({ theme }) => theme.colors.dirtWhite};
  display: flex;
  align-items: center;

  p {
    margin-bottom: .5rem;
    font-weight: 300;
    font-size: .9rem;
  }
`

export default FooterStyle