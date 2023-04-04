import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import ShowOnCondition from "../../../auth/ShowOnCondition.component"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"

const CadastralData = ({
  canEdit,
  fieldsValues
}: FormProps) => {
  const { register, control, watch, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  return (
    <ShowOnCondition showWhen={parseInt(formWatcher.invoiceDiscount?.value) === 1}>
      <div className="grouped">
        <div className="grouped-header">
          <FontAwesomeIcon icon={['far', 'id-card']} className="me-2" />
          Dati catastali
        </div>
        <div className="grouped-body">
          <Row>
            <Col md={4}>
              <SelectWrapper
                name="ownerType"
                control={control}
                register={register}
                label="Possesso immobile in qualità di"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.ownerType || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="cadastralDataFloor"
                label="Piano dati catastali"
                type="number"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
                rules={{ 
                  min: {
                    value: 1,
                    message: errorFormLabels.NOT_NULL
                  }
                }}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="cadastralDataNumber"
                label="Interno dati catastali"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="cadastralDataSheet"
                label="Foglio dati catastali"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="cadastralDataParticle"
                label="Particella/Mappale dati catastali"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="cadastralDataSubordinate"
                label="Subalterno dati catastali"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="usabelArea"
                label="Superficie utile immobile"
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
            <Col md={4}>
              <InputWrapper
                name="realEstateUnits"
                label="Unità che compongono l'edificio"
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
            <Col md={4}>
              <InputWrapper
                name="buildingYear"
                label="Anno costruzione edificio (anche stimato)"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <InputWrapper
                name="deductionRealEstateUnits"
                label="Unità per la detrazione"
                type="number"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="requestForOthers"
                control={control}
                register={register}
                label="Richiesta per altri"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.requestForOthers || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={4}>
              <SelectWrapper
                name="residentialUsePurpose"
                control={control}
                register={register}
                label="Destinazione d'uso residenziale"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.residentialUsePurpose || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <Col md={6}>
              <SelectWrapper
                name="buildingType"
                control={control}
                register={register}
                label="Tipologia edilizia edificio"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.buildingType || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
            <ShowOnCondition showWhen={formWatcher.buildingType?.label === "Altro"}>
              <Col md={6}>
                <InputWrapper
                  name="otherBuildingType"
                  label="Altra tipologia edilizia"
                  type="text"
                  register={register}
                  disabled={canEdit ? false : true}
                  className="form-control"
                  errors={errors}
                  rules={{ required: errorFormLabels.REQUIRED }}
                />
              </Col>
            </ShowOnCondition>
            <Col md={6}>
              <SelectWrapper
                name="setupDoneType"
                control={control}
                register={register}
                label="Intervento eseguito su"
                isDisabled={canEdit? false : true}
                errors={errors}
                options={fieldsValues?.setupDoneType || []}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </ShowOnCondition>
  )
}

export default CadastralData