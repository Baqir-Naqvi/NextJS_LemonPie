import { useFormContext } from "react-hook-form"
import { Col } from "reactstrap"

import { contractApi } from "../../../../../redux/contract/contract.api"
import ShowOnCondition from "../../../../auth/ShowOnCondition.component"
import AsyncSelectWrapper from "../../../inputFields/AsyncSelect/AsyncSelectWrapper.component"
import InputWrapper from "../../../inputFields/Input/InputWrapper.component"
import SelectWrapper from "../../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels, maxLengthLabel } from "../../../utils/formLabels"
import { FormProps } from "../../../utils/types"
import { asyncFnWrapper } from "../../../utils/utils"

const CustomerType = ({
  canEdit, 
  fieldsValues: customerFieldsValues,
}: FormProps) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [fetchTowns] = contractApi.endpoints.fetchTowns.useLazyQuerySubscription()
  const [fetchPostalCodes] = contractApi.endpoints.fetchPostalCodes.useLazyQuerySubscription()

  return (
    <ShowOnCondition showWhen={parseInt(formWatcher.customerType?.value) === 2}>
      <Col md={6}>
        <InputWrapper
          name="companyName"
          label="Società"
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
      <Col md={6}>
        <InputWrapper 
          name="vatNo"
          label="Partita IVA"
          type="text"
          register={register}
          disabled={canEdit ? false : true}
          className="form-control"
          errors={errors}
          rules={{ 
            required: errorFormLabels.REQUIRED,
            pattern: {
              value: /^[0-9]{11}$/,
              message: errorFormLabels.INVALID_VAT
            },
            maxLength: {
              value: 11,
              message: maxLengthLabel(11)
            }
          }}
        />
      </Col>
      <Col md={6}>
        <AsyncSelectWrapper
          name="headOfficeTown"
          control={control}
          register={register}
          label="Città sede legale"
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
          noOptionsMessage={() => 
            <span className="autocomplete-suggestion">Indica le prime lettere del comune per trovarlo nella lista</span>
          }
          whenFieldChanges={option => {
            setValue("headOfficeProvince", option.province)
            setValue("headOfficePostalCode", null)
          }}
        />
      </Col>
      <Col md={6}>
        <InputWrapper
          name="headOfficeAddress"
          label="Indirizzo sede legale"
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
      <Col md={4}>
        <InputWrapper
          name="headOfficeCivicNo"
          label="Civico sede legale"
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
      <Col md={4}>
        <InputWrapper
          name="headOfficeProvince"
          label="Provincia sede legale"
          type="text"
          register={register}
          className="form-control"
          readOnly
        />
      </Col>
      <Col md={4}>
        <SelectWrapper
          name="headOfficePostalCode"
          control={control}
          register={register}
          label="CAP sede legale"
          isDisabled={canEdit? false : true}
          errors={errors}
          rules={{
            required: errorFormLabels.REQUIRED
          }}
          watchedFieldProps={{
            watch: watch,
            watchedFieldName: "headOfficeTown",
            triggerWatchFn: fetchPostalCodes,
            returnedValuePropertyName: "town",
            defaultWatchedFieldValue: formWatcher.headOfficeTown || null,
          }}
        />
      </Col>
    </ShowOnCondition>
  )
}

export default CustomerType