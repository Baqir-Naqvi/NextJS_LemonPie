import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import { contractApi } from "../../../../redux/contract/contract.api"
import AsyncSelectWrapper from "../../inputFields/AsyncSelect/AsyncSelectWrapper.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels, maxLengthLabel } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"
import { asyncFnWrapper } from "../../utils/utils"

const SetupData = ({
  canEdit,
  fieldsValues
}: FormProps) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [fetchTowns] = contractApi.endpoints.fetchTowns.useLazyQuerySubscription()
  const [fetchPostalCodes] = contractApi.endpoints.fetchPostalCodes.useLazyQuerySubscription()

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'id-card']} className="me-2" />
        Dati installazione
      </div>
      <div className="grouped-body">
        <Row>
          <Col md={6}>
            <AsyncSelectWrapper
              name="setupTown"
              control={control}
              register={register}
              label="Città installazione"
              errors={errors}
              isDisabled={canEdit ? false : true}
              loadOptions={(input: string) => {
                if(input.length > 2) {
                  return asyncFnWrapper(input, fetchTowns)
                }
              }}
              getOptionLabel={option => `${option.town} (${option.province})`}
              getOptionValue={option => `${option.town} (${option.province})`}
              rules={{ required: errorFormLabels.REQUIRED }}
              whenFieldChanges={option => {
                setValue("setupProvince", option.province)
                setValue("setupPostalCode", null)
              }}
            />
          </Col>
          <Col md={3}>
            <InputWrapper
              name="setupProvince"
              label="Provincia installazione"
              type="text"
              register={register}
              className="form-control"
              readOnly
            />
          </Col>
          <Col md={3}>
            <SelectWrapper
              name="setupPostalCode"
              control={control}
              register={register}
              label="CAP installazione"
              isDisabled={canEdit? false : true}
              errors={errors}
              rules={{
                required: errorFormLabels.REQUIRED
              }}
              watchedFieldProps={{
                watch: watch,
                watchedFieldName: "setupTown",
                triggerWatchFn: fetchPostalCodes,
                returnedValuePropertyName: "town",
                defaultWatchedFieldValue: formWatcher.setupTown || null,
              }}
            />
          </Col>
          <Col md={10}>
            <InputWrapper
              name="setupAddress"
              label="Indirizzo installazione"
              type="text"
              register={register}
              disabled={canEdit ? false : true}
              className="form-control"
              errors={errors}
              rules={{ 
                required: errorFormLabels.REQUIRED,
                maxLength: {
                  value: 80,
                  message: maxLengthLabel(80)
                } 
              }}
            />
          </Col>
          <Col md={2}>
            <InputWrapper
              name="setupCivicNo"
              label="Civico installazione"
              type="text"
              register={register}
              disabled={canEdit ? false : true}
              className="form-control"
              errors={errors}
              rules={{ 
                required: errorFormLabels.REQUIRED,
                maxLength: {
                  value: 10,
                  message: maxLengthLabel(10)
                } 
              }}
            />
          </Col>
          <Col md={12}>
            <SelectWrapper
              name="invoiceDiscount"
              control={control}
              register={register}
              label="Cessione credito e sconto in fattura"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={fieldsValues?.invoiceDiscount || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SetupData