import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FieldValues, useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import CiDropzoneStyle from "./style"
import AttachmentsDropzone from "../../../AttachmentsDropzone/AttachmentsDropzone.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"

const CiDropzone = ({
  canEdit,
}: FormProps) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  return (
    <CiDropzoneStyle className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'id-badge']} className="me-2" />
        Carica il fronte e retro della Carta d&apos;identità
      </div>
      <div className="grouped-body">
        <Row>
          <Col>
            <AttachmentsDropzone
              addFile={(data: FieldValues) => {
                setValue("mandatory.ciFront", data[0])
              }}
              isMulti={false}
              openDialogWithBtn={canEdit}
              disabled={!canEdit}
            />
            <section className="file-info">
              <InputWrapper
                name="mandatory.ciFront.userFileName"
                register={register}
                label="File C.I. fronte"
                className="form-control"
                type="text"
                readOnly
                errors={errors}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
              {formWatcher.mandatory?.ciFront?.userFileName &&
                <span className="file-loaded-check">
                  <FontAwesomeIcon 
                    icon={['far', 'circle-check']} 
                  />
                </span>
              }
            </section>
          </Col>
          <Col>
            <AttachmentsDropzone
              addFile={(data: FieldValues) => {
                setValue("mandatory.ciBack", data[0])
              }}
              isMulti={false}
              openDialogWithBtn={canEdit}
              disabled={!canEdit}
            />
            <section className="file-info">
              <InputWrapper
                name="mandatory.ciBack.userFileName"
                register={register}
                label="File C.I. retro"
                className="form-control"
                type="text"
                readOnly
                errors={errors}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
              {formWatcher.mandatory?.ciBack?.userFileName &&
                <span className="file-loaded-check">
                  <FontAwesomeIcon 
                    icon={['far', 'circle-check']} 
                  />
                </span>
              }
            </section>
          </Col>
        </Row>
      </div>
    </CiDropzoneStyle>
  )
}

export default CiDropzone