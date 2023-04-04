import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"

import DatePickerWrapper from "../../inputFields/DatePicker/DatePickerWrapper.component"
import AsyncSelectWrapper from "../../inputFields/AsyncSelect/AsyncSelectWrapper.component"
import DomicileData from "./DomicileData/DomicileData.component"
import CustomerType from "./CustomerType/CustomerType.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import ShowOnCondition from "../../../auth/ShowOnCondition.component"
import { contractApi } from "../../../../redux/contract/contract.api"
import { errorFormLabels, maxLengthLabel } from "../../utils/formLabels"
import { asyncFnWrapper } from "../../utils/utils"
import { FormProps } from "../../utils/types"
import { codiceFISCALE, emailCheck, euPhoneCheck, mustBeAdult } from "../../utils/validations"

const GeneralData = ({ 
  canEdit, 
  fieldsValues: customerFieldsValues,
}: FormProps ) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [fetchTowns] = contractApi.endpoints.fetchTowns.useLazyQuerySubscription()
  const [fetchPostalCodes] = contractApi.endpoints.fetchPostalCodes.useLazyQuerySubscription()
  
  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'id-card']} className="me-2" />
        Dati cliente
      </div>
      <div className="grouped-body">
        <Row>
          <ShowOnCondition showWhen={formWatcher.userLogged}>
            <Col md={12}>
              <InputWrapper
                name="userLogged"
                label="Utente"
                type="text"
                register={register}
                readOnly
                className="form-control"
              />
            </Col>
          </ShowOnCondition>
          <Col md={6}>
            <InputWrapper
              name="customerName"
              label="Nome cliente"
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
              name="customerSurname"
              label="Cognome cliente"
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
            <AsyncSelectWrapper
              name="customerBirthPlace"
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
              whenFieldChanges={option => setValue("customerBirthProvince", option.province)}
              loadingMessage={() => "Sto cercando..."}
              noOptionsMessage={() => 
                <span className="autocomplete-suggestion">Indica le prime lettere del comune per trovarlo nella lista</span>
              }
            />
          </Col>
          <Col md={2}>
            <InputWrapper
              name="customerBirthProvince"
              label="Provincia nascita"
              type="text"
              register={register}
              className="form-control"
              readOnly
            />
          </Col>
          <Col md={4}>
            <DatePickerWrapper
              name="customerBirthDate"
              control={control}
              label="Data di nascita"
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
        </Row>
        <Row>
          <Col md={6}>
            <AsyncSelectWrapper 
              name="residenceTown"
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
                setValue("residenceProvince", option.province)
                setValue("residencePostalCode", null)
              }}
              loadingMessage={() => "Sto cercando..."}
              noOptionsMessage={() => 
                <span className="autocomplete-suggestion">Indica le prime lettere del comune per trovarlo nella lista</span>
              }
            />
          </Col>
          <Col md={6}>
            <InputWrapper
              name="residenceAddress"
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
          <Col md={4}>
            <InputWrapper
              name="residenceCivicNo"
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
            <InputWrapper
              name="residenceProvince"
              label="Provincia residenza"
              type="text"
              register={register}
              className="form-control"
              readOnly
            />
          </Col>
          <Col md={4}>
            <SelectWrapper
              name="residencePostalCode"
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
                watchedFieldName: "residenceTown",
                triggerWatchFn: fetchPostalCodes,
                returnedValuePropertyName: "town",
                defaultWatchedFieldValue: formWatcher.residenceTown || null,
              }}
            />
          </Col>
          <Col md={6}>
            <InputWrapper 
              type="text"
              disabled={canEdit ? false : true}
              className="form-control text-uppercase"
              name="customerFiscalCode"
              label="Codice fiscale"
              placeholder="Codice fiscale"
              rules={{
                required: errorFormLabels.REQUIRED,
                validate: value => codiceFISCALE(value) || errorFormLabels.INVALID_CF
              }}
              register={register}
              errors={errors}
            />
          </Col>
          <Col md={6}>
            <SelectWrapper
              name="documentIdentityType"
              control={control}
              register={register}
              label="Tipo documento"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={customerFieldsValues?.documentIdentityType || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
          <Col md={6}>
            <InputWrapper
              name="customerIdentityNo"
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
          <Col md={6}>
            <SelectWrapper
              name="customerIdentityEntity"
              control={control}
              register={register}
              label="Rilasciato da"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={customerFieldsValues?.customerIdentityEntity || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
          <Col md={6}>
            <DatePickerWrapper 
              name="documentIdentityReleaseDate"
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
          <Col md={6}>
            <DatePickerWrapper 
              name="documentIdentityDueDate"
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
              loadingMessage={() => "Sto cercando..."}
              noOptionsMessage={() => 
                <span className="autocomplete-suggestion">Indica le prime lettere del comune per trovarlo nella lista</span>
              }
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
            />
          </Col>
          <Col md={6}>
            <InputWrapper
              name="customerPhoneNo"
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
          <Col md={6}>
            <InputWrapper
              name="customerMobilePhoneNo"
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
          <Col md={6}>
            <InputWrapper
              name="customerEmail"
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
          <Col md={6}>
            <SelectWrapper 
              name="domicileEqualsResidence"
              control={control}
              label="Il domicilio corrisponde alla residenza?"
              isDisabled={canEdit ? false : true}
              errors={errors}
              options={customerFieldsValues?.domicileEqualsResidence || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
          
          <DomicileData
            fieldsValues={customerFieldsValues}
            canEdit={canEdit}
          />

          <Col md={12}>
            <SelectWrapper 
              name="customerType"
              control={control}
              label="Tipologia cliente"
              isDisabled={formWatcher.id ? true : false}
              errors={errors}
              options={customerFieldsValues?.customerType || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>

          <CustomerType
            fieldsValues={customerFieldsValues}
            canEdit={canEdit}
          />
        </Row>
      </div>
    </div>
  )
}

export default GeneralData