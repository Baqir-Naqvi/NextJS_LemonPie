import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FieldValues, useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import HealthInsuranceDropzoneStyle from "./style"
import AttachmentsDropzone from "../../../AttachmentsDropzone/AttachmentsDropzone.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"

const HealthInsuranceDropzone = ({
  canEdit,
}: FormProps) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  return (
    <HealthInsuranceDropzoneStyle className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'notes-medical']} className="me-2" />
        Carica il fronte e retro della Tessera sanitaria
      </div>
      <div className="grouped-body">
        <Row>
          <Col>
            <AttachmentsDropzone
              addFile={(data: FieldValues) => {
                setValue("mandatory.healthInsuranceFront", data[0])
              }}
              isMulti={false}
              openDialogWithBtn={canEdit}
              disabled={!canEdit}
            />
            <section className="file-info">
              <InputWrapper
                name="mandatory.healthInsuranceFront.userFileName"
                register={register}
                label="File tessera sanitaria fronte"
                className="form-control"
                type="text"
                readOnly
                errors={errors}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
              {formWatcher.mandatory?.healthInsuranceFront?.userFileName &&
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
                setValue("mandatory.healthInsuranceBack", data[0])
              }}
              isMulti={false}
              openDialogWithBtn={canEdit}
              disabled={!canEdit}
            />
            <section className="file-info">
              <InputWrapper
                name="mandatory.healthInsuranceBack.userFileName"
                register={register}
                label="File tessera sanitaria retro"
                className="form-control"
                type="text"
                readOnly
                errors={errors}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
              {formWatcher.mandatory?.healthInsuranceBack?.userFileName &&
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
    </HealthInsuranceDropzoneStyle>
  )
}

export default HealthInsuranceDropzone