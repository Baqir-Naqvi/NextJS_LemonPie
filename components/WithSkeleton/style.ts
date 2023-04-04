import styled from 'styled-components'

const WithSkeletonStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  header {
    margin-bottom: 1rem;
  }

  .react-loading-skeleton {
    background-color: #aeb796;

    &:after {
      background: linear-gradient(270deg, rgba(154,172,105,1) 0%, rgba(168,194,117,1) 100%);
    }
  }
`

export default WithSkeletonStyle