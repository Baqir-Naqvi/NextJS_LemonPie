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

const DomicileData = ({
  canEdit
}: FormProps) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [fetchTowns] = contractApi.endpoints.fetchTowns.useLazyQuerySubscription()
  const [fetchPostalCodes] = contractApi.endpoints.fetchPostalCodes.useLazyQuerySubscription()

  return (
    <ShowOnCondition showWhen={parseInt(formWatcher.domicileEqualsResidence?.value) === 2}>
      <Col md={6}>
        <AsyncSelectWrapper
          name="domicileTown"
          control={control}
          register={register}
          label="Città domicilio"
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
            setValue("domicileProvince", option.province)
            setValue("domicilePostalCode", null)
          }}
        />
      </Col>
      <Col md={6}>
        <InputWrapper
          name="domicileAddress"
          label="Indirizzo domicilio"
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
          name="domicileCivicNo"
          label="Civico domicilio"
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
      <Col md={4}>
        <InputWrapper
          name="domicileProvince"
          label="Provincia domicilio"
          type="text"
          register={register}
          className="form-control"
          readOnly
        />
      </Col>
      <Col md={4}>
        <SelectWrapper
          name="domicilePostalCode"
          control={control}
          register={register}
          label="CAP domicilio"
          isDisabled={canEdit? false : true}
          errors={errors}
          rules={{
            required: errorFormLabels.REQUIRED
          }}
          watchedFieldProps={{
            watch: watch,
            watchedFieldName: "domicileTown",
            triggerWatchFn: fetchPostalCodes,
            returnedValuePropertyName: "town",
            defaultWatchedFieldValue: formWatcher.domicileTown || null,
          }}
        />
      </Col>
    </ShowOnCondition>
  )
}

export default DomicileData