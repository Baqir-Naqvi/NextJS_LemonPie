import styled from "styled-components"

import Bkg from '../../public/bkg.svg'

const LayoutStyle = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  z-index: 10;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    background-image: url(${Bkg.src});
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;  
    animation-name: moveBkg;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }

  @keyframes moveBkg {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }

  main {
    padding: 0 1rem;

    @media (min-width: 576px) {
      padding: 0;
    }
  }
`

export default LayoutStyle