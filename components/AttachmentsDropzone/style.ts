import styled from "styled-components"

const AttachmentsDropzoneStyle = styled.section`
  margin-bottom: 1rem;
  margin-top: 1rem;

  .dropzone {
    border: 1px dashed ${({ theme }) => theme.colors.azure};
    display: flex;
    flex-direction: column;
    padding: 3rem 1rem;

    > p {
      text-align: center;
      margin: 0;
      font-size: .9rem;
      color: ${({ theme }) => theme.colors.lightGrey};
    }
  }
`

export default AttachmentsDropzoneStyle