import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"

const AirConditionerTechData = ({
  canEdit
}: FormProps) => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'air-conditioner']} className="me-2" />
        Dati condizionatore
      </div>
      <div className="grouped-body">
        <Row>
          <Col md={12}>
            <InputWrapper
              name="splitArea"
              label="Metri quadri totali coperti dagli split"
              type="number"
              register={register}
              disabled={canEdit ? false : true}
              className="form-control"
              errors={errors}
              rules={{ 
                required: errorFormLabels.REQUIRED,
                min: {
                  value: 1,
                  message: errorFormLabels.NOT_NULL,
                }
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AirConditionerTechData