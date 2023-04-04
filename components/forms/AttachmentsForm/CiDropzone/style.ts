import styled from "styled-components"

const CiDropzoneStyle = styled.div`
  .file-info {
    margin-bottom: 1rem;
    position: relative;

    .file-loaded-check {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.25rem;
      display: flex;
      align-items: flex-start;
      height: 100%;
      padding-right: .5rem;
      color: ${({ theme }) => theme.colors.ligthIndaco};
    }
  }

  .form-group {
    margin-bottom: 0 !important;
  }

  .attachment-datetime {
    font-size: .75rem;
    padding: 0 .25rem;
    margin-bottom: .25rem;

    a {
      vertical-align: baseline;
    }
  }
`

export default CiDropzoneStyle