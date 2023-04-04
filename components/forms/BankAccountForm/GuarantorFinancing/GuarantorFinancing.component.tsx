import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import { contractApi } from "../../../../redux/contract/contract.api"
import ShowOnCondition from "../../../auth/ShowOnCondition.component"
import AsyncSelectWrapper from "../../inputFields/AsyncSelect/AsyncSelectWrapper.component"
import DatePickerWrapper from "../../inputFields/DatePicker/DatePickerWrapper.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import MoneyInputWrapper from "../../inputFields/MoneyInput/MoneyInputWrapper.component"
import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels, maxLengthLabel } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"
import { asyncFnWrapper } from "../../utils/utils"
import { codiceFISCALE, emailCheck, euPhoneCheck, isValidIban, mustBeAdult } from "../../utils/validations"

const GuarantorFinancing = ({
  canEdit,
  fieldsValues
}: FormProps) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [fetchTowns] = contractApi.endpoints.fetchTowns.useLazyQuerySubscription()
  const [fetchPostalCodes] = contractApi.endpoints.fetchPostalCodes.useLazyQuerySubscription()

  return (
    <ShowOnCondition showWhen={parseInt(formWatcher.guarantor?.value) === 1}>
      <div className="grouped">
        <div className="grouped-header">
          <FontAwesomeIcon icon={['far', 'id-card']} className="me-2" />
          Dati finanziamento - Garante
        </div>
        <div className="grouped-body">
          <Row>
            <Col md={12}>
              <SelectWrapper
                name="payer"
                control={control}
                register={register}
                label="Pagante"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.payer || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <MoneyInputWrapper
                name="guarantorValue"
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
            <Col md={4}>
              <MoneyInputWrapper
                name="guarantorValueToFinance"
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
            <Col md={4}>
              <InputWrapper
                name="guarantorPaymentsNo"
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
              <InputWrapper
                name="guarantorName"
                label="Nome garante"
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
                name="guarantorSurname"
                label="Cognome garante"
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
            <Col md={10}>
              <AsyncSelectWrapper
                name="guarantorBirthplace"
                control={control}
                register={register}
                label="Comune nascita"
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
                  setValue("guarantorBirthProvince", option.province)
                }}
              />
            </Col>
            <Col md={2}>
              <InputWrapper
                name="guarantorBirthProvince"
                label="Provincia nascita"
                type="text"
                register={register}
                className="form-control"
                readOnly
              />
            </Col>
            <Col md={6}>
              <DatePickerWrapper
                name="guarantorBirthDate"
                control={control}
                label="Data nascita"
                className="form-control"
                errors={errors}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                rules={{ 
                  required: errorFormLabels.REQUIRED,
                  validate: value => mustBeAdult(value) || errorFormLabels.ADULT_REQUIRED
                }}
                disabled={canEdit ? false : true}
              />
            </Col>
            <Col md={6}>
              <InputWrapper 
                type="text"
                disabled={canEdit ? false : true}
                className="form-control text-uppercase"
                name="guarantorFiscalCode"
                label="Codice fiscale"
                rules={{
                  maxLength: {
                    value: 20,
                    message: maxLengthLabel(20)
                  },
                  required: errorFormLabels.REQUIRED,
                  validate: value => codiceFISCALE(value) || errorFormLabels.INVALID_CF
                }}
                register={register}
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="guarantorPhoneNo"
                label="Telefono"
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
            <Col md={4}>
              <InputWrapper
                name="guarantorMobilePhoneNo"
                label="Cellulare"
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
            <Col md={4}>
              <InputWrapper
                name="guarantorEmail"
                label="Email"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control text-lowercase"
                errors={errors}
                rules={{ 
                  required: errorFormLabels.REQUIRED,
                  validate: value => emailCheck(value) || errorFormLabels.INVALID_EMAIL,
                  maxLength: {
                    value: 80,
                    message: maxLengthLabel(80)
                  }
                }}
              />
            </Col>
            <Col md={8}>
              <AsyncSelectWrapper
                name="guarantorResidenceTown"
                control={control}
                register={register}
                label="Città residenza"
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
                  setValue("guarantorResidenceProvince", option.province)
                  setValue("guarantorResidencePostalCode", null)
                }}
              />
            </Col>
            <Col md={2}>
              <InputWrapper
                name="guarantorResidenceProvince"
                label="Provincia residenza"
                type="text"
                register={register}
                className="form-control"
                readOnly
              />
            </Col>
            <Col md={2}>
              <SelectWrapper
                name="guarantorResidencePostalCode"
                control={control}
                register={register}
                label="CAP residenza"
                isDisabled={canEdit? false : true}
                errors={errors}
                rules={{
                  required: errorFormLabels.REQUIRED
                }}
                watchedFieldProps={{
                  watch: watch,
                  watchedFieldName: "guarantorResidenceTown",
                  triggerWatchFn: fetchPostalCodes,
                  returnedValuePropertyName: "town",
                  defaultWatchedFieldValue: formWatcher.guarantorResidenceTown || null,
                }}
              />
            </Col>
            <Col md={10}>
              <InputWrapper
                name="guarantorResidenceAddress"
                label="Indirizzo residenza"
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
                name="guarantorResidenceCivicNo"
                label="Civico residenza"
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
                name="guarantorResidenceType"
                control={control}
                register={register}
                label="Tipo abitazione"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.guarantorResidenceType || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <DatePickerWrapper
                name="guarantorResidentSince"
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
            <Col md={4}>
              <SelectWrapper
                name="guarantorDocumentIdentityType"
                control={control}
                register={register}
                label="Tipo documento"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.guarantorDocumentIdentityType || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="guarantorDocumentIdentityNo"
                label="Numero documento d'identità"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
                rules={{ 
                  required: errorFormLabels.REQUIRED,
                  maxLength: {
                    value: 20,
                    message: maxLengthLabel(20)
                  }
                }}
              />
            </Col>
            <Col md={4}>
              <DatePickerWrapper 
                name="guarantorDocumentIdentityReleaseDate"
                control={control}
                label="Data rilascio"
                className="form-control"
                errors={errors}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                rules={{ required: errorFormLabels.REQUIRED }}
                disabled={canEdit ? false : true}
              />
            </Col>
            <Col md={4}>
              <DatePickerWrapper 
                name="guarantorDocumentIdentityDueDate"
                control={control}
                label="Data scadenza"
                className="form-control"
                errors={errors}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                rules={{ required: errorFormLabels.REQUIRED }}
                disabled={canEdit ? false : true}
              />
            </Col>
            <Col md={10}>
              <AsyncSelectWrapper 
                name="guarantorDocumentIdentityReleaseTown"
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
                whenFieldChanges={option => setValue("guarantorDocumentIdentityReleaseProvince", option.province)}
              />
            </Col>
            <Col md={2}>
              <InputWrapper
                name="guarantorDocumentIdentityReleaseProvince"
                label="Provincia rilascio"
                type="text"
                register={register}
                className="form-control"
                readOnly
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="guarantorMaritalStatus"
                control={control}
                register={register}
                label="Stato civile"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.guarantorMaritalStatus || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="guarantorEmploymentType"
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
            <Col md={4}>
              <DatePickerWrapper
                name="guarantorEmployedFrom"
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
            <Col md={4}>
              <MoneyInputWrapper
                name="guarantorNetIncome"
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
            <Col md={4}>
              <InputWrapper
                name="guarantorEmployerName"
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
            <Col md={4}>
              <InputWrapper
                name="guarantorEmployerPhoneNo"
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
                name="guarantorEmployerTown"
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
                  setValue("guarantorEmployerProvince", option.province)
                  setValue("guarantorEmployerPostalCode", null)
                }}
              />
            </Col>
            <Col md={2}>
              <InputWrapper
                name="guarantorEmployerProvince"
                label="Provincia datore lavoro"
                type="text"
                register={register}
                className="form-control"
                readOnly
              />
            </Col>
            <Col md={2}>
              <SelectWrapper
                name="guarantorEmployerPostalCode"
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
                  watchedFieldName: "guarantorEmployerTown",
                  triggerWatchFn: fetchPostalCodes,
                  returnedValuePropertyName: "town",
                  defaultWatchedFieldValue: formWatcher.guarantorEmployerTown || null,
                }}
              />
            </Col>
            <Col md={10}>
              <InputWrapper
                name="guarantorEmployerAddress"
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
                name="guarantorEmployerCivicNo"
                label="Civico datore lavoro"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
                rules={{ 
                  required: errorFormLabels.REQUIRED,
                  maxLength: {
                    value: 20,
                    message: maxLengthLabel(10)
                  }
                }}
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="guarantorLoanMode"
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
                name="guarantorLoanDueDate"
                control={control}
                register={register}
                label="Scadenza pagamento"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.guarantorLoanDueDate || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="guarantorLoanCommunicationMode"
                control={control}
                register={register}
                label="Comunicazioni tramite"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.guarantorLoanCommunicationMode || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={12}>
              <InputWrapper 
                type="text"
                disabled={canEdit ? false : true}
                className="form-control text-uppercase"
                name="guarantorIban"
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
          </Row>
        </div>
      </div>
    </ShowOnCondition>
  )
}

export default GuarantorFinancing