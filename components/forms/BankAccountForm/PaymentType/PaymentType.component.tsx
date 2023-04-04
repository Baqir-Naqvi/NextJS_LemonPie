import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"

const PaymentType = ({
  canEdit,
  fieldsValues
}: FormProps) => {
  const { register, control, formState: { errors } } = useFormContext()

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'credit-card']} className="me-2" />
        Metodo di pagamento
      </div>
      <div className="grouped-body">
        <Row>
          <Col md={12}>
            <SelectWrapper
              name="paymentMode"
              control={control}
              register={register}
              label="Tipologia pagamento"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={fieldsValues?.paymentMode || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PaymentType