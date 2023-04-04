import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormContext } from "react-hook-form"
import { Col, Row } from "reactstrap"
import ShowOnCondition from "../../../auth/ShowOnCondition.component"

import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import SelectWrapper from "../../inputFields/Select/SelectWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FormProps } from "../../utils/types"

const HeaterTechData = ({
  canEdit,
  fieldsValues
}: FormProps) => {
  const { register, control, watch, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'heat']} className="me-2" />
        Dati Caldaia
      </div>
      <div className="grouped-body">
        <Row>
          <Col md={6}>
            <InputWrapper
              name="power"
              label="Potenza utile nominale"
              type="number"
              register={register}
              disabled={canEdit ? false : true}
              className="form-control"
              errors={errors}
              rules={{ 
                required: errorFormLabels.REQUIRED,
                min: 0,
              }}
            />
          </Col>
          <Col md={6}>
            <SelectWrapper
              name="heatingSystemType"
              control={control}
              register={register}
              label="Tipo impianto termico"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={fieldsValues?.heatingSystemType || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
          <ShowOnCondition showWhen={formWatcher.heatingSystemType?.label === "Altro"}>
            <Col md={12}>
              <InputWrapper
                name="otherHeatingSystemType"
                label="Altro tipo impianto termico"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
          </ShowOnCondition>
          <Col md={12}>
            <SelectWrapper
              name="generatorType"
              control={control}
              register={register}
              label="Tipo di generatore attuale"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={fieldsValues?.generatorType || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
          <ShowOnCondition showWhen={formWatcher.generatorType?.label === "Altro"}>
            <Col md={12}>
              <InputWrapper
                name="otherGeneratorType"
                label="Altro tipo di generatore attuale"
                type="text"
                register={register}
                disabled={canEdit ? false : true}
                className="form-control"
                errors={errors}
                rules={{ required: errorFormLabels.REQUIRED }}
              />
            </Col>
          </ShowOnCondition>
          <Col md={12}>
            <SelectWrapper
              name="isAirConditionerPresent"
              control={control}
              register={register}
              label="Presenza di climatizzatore"
              isDisabled={canEdit? false : true}
              errors={errors}
              options={fieldsValues?.isAirConditionerPresent || []}
              rules={{ required: errorFormLabels.REQUIRED }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default HeaterTechData