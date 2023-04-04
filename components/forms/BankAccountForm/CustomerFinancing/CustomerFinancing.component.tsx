import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import ShowOnCondition from "../../../auth/ShowOnCondition.component"
import AsyncSelectWrapper from "../../inputFields/AsyncSelect/AsyncSelectWrapper.component"
import DatePickerWrapper from "../../inputFields/DatePicker/DatePickerWrapper.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import MoneyInputWrapper from "../../inputFields/MoneyInput/MoneyInputWrapper.component"
import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels, maxLengthLabel } from "../../utils/formLabels"
import { contractApi } from "../../../../redux/contract/contract.api"
import { FormProps } from "../../utils/types"
import { asyncFnWrapper } from "../../utils/utils"
import { euPhoneCheck, isValidIban } from "../../utils/validations"

const CustomerFinancing = ({
  canEdit,
  fieldsValues
}: FormProps) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext()
  const formWatcher = watch()  

  const [fetchTowns] = contractApi.endpoints.fetchTowns.useLazyQuerySubscription()
  const [fetchPostalCodes] = contractApi.endpoints.fetchPostalCodes.useLazyQuerySubscription()

  return (
    <ShowOnCondition showWhen={formWatcher.paymentMode?.label.toLowerCase() === "finanziamento"}>
      <div className="grouped">
        <div className="grouped-header">
          <FontAwesomeIcon icon={['far', 'id-card']} className="me-2" />
          Dati finanziamento - Cliente
        </div>
        <div className="grouped-body">
          <Row>
            <Col md={6}>
              <MoneyInputWrapper
                name="value"
                label="Valore bene"
                type="number"
                register={register}
                errors={errors}
                className="form-control"
                rules={{ 
                  min: {
                    value: 1,
                    message: errorFormLabels.NOT_NULL
                  },
                  required: errorFormLabels.REQUIRED
                }}
                currency="€"
                cents=",00"
              />
            </Col>
            <Col md={6}>
              <MoneyInputWrapper
                name="valueToFinance"
                label="Importo da finanziare"
                type="number"
                errors={errors}
                register={register}
                className="form-control"
                rules={{ 
                  min: {
                    value: 1,
                    message: errorFormLabels.NOT_NULL
                  },
                  required: errorFormLabels.REQUIRED
                }}
                currency="€"
                cents=",00"
              />
            </Col>
            <Col md={6}>
              <InputWrapper
                name="paymentsNo"
                label="Numero rate"
                type="number"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
                rules={{ 
                  required: errorFormLabels.REQUIRED,
                  min: 1,
                }}
              />
            </Col>
            <Col md={6}>
              <SelectWrapper
                name="residenceType"
                control={control}
                register={register}
                label="Tipo abitazione"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.residenceType || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <DatePickerWrapper
                name="residentSince"
                control={control}
                label="Residente dal"
                className="form-control"
                errors={errors}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                rules={{ required: errorFormLabels.REQUIRED }}
                disabled={canEdit ? false : true}
              />
            </Col>
            {/* <Col md={6}>
              <AsyncSelectWrapper
                name="documentIdentityReleaseTown"
                control={control}
                register={register}
                label="Comune rilascio"
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
                whenFieldChanges={option => setValue("documentIdentityReleaseProvince", option.province)}
              />
            </Col>
            <Col md={2}>
              <InputWrapper
                name="documentIdentityReleaseProvince"
                label="Provincia rilascio"
                type="text"
                register={register}
                className="form-control"
                readOnly
                disabled={canEdit ? false : true}
              />
            </Col> */}
            <Col md={6}>
              <SelectWrapper
                name="maritalStatus"
                control={control}
                register={register}
                label="Stato civile"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.maritalStatus || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={6}>
              <InputWrapper
                name="employmentType"
                label="Tipo occupazione"
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
              <DatePickerWrapper
                name="employedFrom"
                control={control}
                label="Occupato da"
                className="form-control"
                errors={errors}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                rules={{ required: errorFormLabels.REQUIRED }}
                disabled={canEdit ? false : true}
              />
            </Col>
            <Col md={6}>
              <MoneyInputWrapper
                name="netIncome"
                label="Reddito netto mensile"
                type="number"
                register={register}
                errors={errors}
                className="form-control"
                rules={{ 
                  min: {
                    value: 1,
                    message: errorFormLabels.NOT_NULL
                  },
                  required: errorFormLabels.REQUIRED
                }}
                currency="€"
                cents=",00"
              />
            </Col>
            <Col md={6}>
              <InputWrapper
                name="employerName"
                label="Denominazione datore lavoro"
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
                name="employerPhoneNo"
                label="Telefono datore lavoro"
                type="number"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control phone-number"
                errors={errors}
                rules={{ 
                  required: errorFormLabels.REQUIRED,
                  validate: value => euPhoneCheck(value) || errorFormLabels.INVALID_PHONE,
                  maxLength: {
                    value: 20,
                    message: maxLengthLabel(20)
                  }
                }}
              />
            </Col>
            <Col md={8}>
              <AsyncSelectWrapper
                name="employerTown"
                control={control}
                register={register}
                label="Città datore lavoro"
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
                  setValue("employerProvince", option.province)
                  setValue("employerPostalCode", null)
                }}
              />
            </Col>
            <Col md={2}>
              <InputWrapper
                name="employerProvince"
                label="Provincia datore lavoro"
                type="text"
                register={register}
                className="form-control"
                readOnly
              />
            </Col>
            <Col md={2}>
              <SelectWrapper
                name="employerPostalCode"
                control={control}
                register={register}
                label="CAP"
                isDisabled={canEdit? false : true}
                errors={errors}
                rules={{
                  required: errorFormLabels.REQUIRED
                }}
                watchedFieldProps={{
                  watch: watch,
                  watchedFieldName: "employerTown",
                  triggerWatchFn: fetchPostalCodes,
                  returnedValuePropertyName: "town",
                  defaultWatchedFieldValue: formWatcher.employerTown || null,
                }}
              />
            </Col>
            <Col md={10}>
              <InputWrapper
                name="employerAddress"
                label="Indirizzo datore lavoro"
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
                name="employerCivicNo"
                label="Civico datore lavoro"
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
              <SelectWrapper
                name="loanMode"
                control={control}
                register={register}
                label="Pagamento tramite"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.loanMode || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="loanDueDate"
                control={control}
                register={register}
                label="Scadenza pagamento"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.loanDueDate || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="loanCommunicationMode"
                control={control}
                register={register}
                label="Comunicazioni tramite"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.loanCommunicationMode || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={12}>
              <InputWrapper 
                type="text"
                disabled={canEdit ? false : true}
                className="form-control text-uppercase"
                name="iban"
                label="IBAN"
                placeholder="IBAN"
                rules={{
                  required: errorFormLabels.REQUIRED,
                  validate: value => isValidIban(value) || errorFormLabels.INVALID_IBAN
                }}
                register={register}
                errors={errors}
              />
            </Col>
            <Col md={12}>
              <SelectWrapper
                name="guarantor"
                control={control}
                register={register}
                label="Vuoi inserire un garante?"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.guarantor || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </ShowOnCondition>
  )
}

export default CustomerFinancing