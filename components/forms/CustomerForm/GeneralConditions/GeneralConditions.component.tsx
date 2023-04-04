import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button, Col, Row } from "reactstrap"

import CheckboxWrapper from "../../inputFields/Checkbox/CheckboxWrapper.component"
import GeneralConditionsModal from "./GeneralConditionsModal.component"
import { errorFormLabels } from "../../utils/formLabels"

const GeneralConditions = () => {
  const { register, watch, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [gcModalVisibility, gcSetModalVisibility] = useState(false)
  const toggleGc = () => gcSetModalVisibility(prevState => !prevState)

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'clipboard-check']} className="me-2" />
        Condizioni Generali di Contratto
      </div>
      <div className="grouped-body privacy">
        <Row className="mt-2">
          <Col>
            <Button
              className="mb-3"
              onClick={toggleGc}
              outline
            >
              Leggi condizioni
            </Button>
            <GeneralConditionsModal 
              toggle={toggleGc}
              isOpen={gcModalVisibility}
              formWatcher={formWatcher}
            />
          </Col>
          <Col md={12}>
            <CheckboxWrapper 
              name="generalConditions"
              label="Ho letto le Condizioni Generali di Contratto"
              className="form-check-input"
              register={register}
              errors={errors}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default GeneralConditions