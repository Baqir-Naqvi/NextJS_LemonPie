import { Row } from "reactstrap"
import styled from "styled-components"

const AttachmentRowStyle = styled(Row)`
  margin-bottom: 1rem;

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

  .action-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    @media (max-width: 991.9px) {
      justify-content: flex-end;
      margin-top: .5rem;
    }

    .btn {
      width: 34px;
      margin: .15rem;
    }
  }
`

export default AttachmentRowStyle