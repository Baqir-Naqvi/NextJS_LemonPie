import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { Button, Form } from "reactstrap"

import ShowOnCondition from "../../auth/ShowOnCondition.component"
import ButtonWithLoader from "../../ButtonWithLoader/ButtonWithLoader.component"
import CadastralData from "./CadastralData/CadastralData.component"
import SetupData from "./SetupData/SetupData.component"
import AirConditionerTechData from "./AirConditionerTechData/AirConditionerTechData.component"
import HeaterTechData from "./HeaterTechData/HeaterTechData.component"
import ScrollToTop from "../../ScrollToTop/ScrollToTop.component"
import { Permissions } from "../../../redux/api/types"
import { useSubmitContractTechDataMutation } from "../../../redux/contract/techData/techData.api"
import { canI } from "../../auth/utils"
import { setDefaultFormData } from "./utils"
import { useSelectContractId, useSelectEntityName, useSetSelectedStep } from "../../../providers/ContractsFormPageProvider.providers"
import { ContractTabsMap } from "../../../redux/contract/contract.utils"

type TechDataFormProps = {
  techDataFieldsValues: FieldValues
  techData?: any
  permissions: Permissions
}

const TechDataForm = ({
  permissions,
  techDataFieldsValues,
  techData
}: TechDataFormProps) => {
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()
  const setSelectedStep = useSetSelectedStep()!
  let canEdit = canI(`${entityName}TechDataCREATE`, permissions).abilityCheck
  if(techData) {
    canEdit = canI(`${entityName}TechDataUPDATE`, techData.links).abilityCheck
  }

  const formProps = useForm<FieldValues>({
    defaultValues: {
      contractId,
      ...setDefaultFormData(techData),
    }
  })
  const { handleSubmit, watch, formState: { isSubmitting } } = formProps
  const formWatcher = watch()
  const [submitTechData] = useSubmitContractTechDataMutation()
  const onSubmit = async (values: FieldValues) => {
    await submitTechData({ values, entityName })
  }

  return (
    <FormProvider {...formProps}>
      <ScrollToTop />
      <Form 
        onSubmit={handleSubmit(onSubmit)}
        className="my-5"
      >
        <SetupData 
          canEdit={canEdit}
          fieldsValues={techDataFieldsValues}
        />
        <ShowOnCondition 
          showWhen={
            entityName === "airConditioner" && 
            parseInt(formWatcher.invoiceDiscount?.value) === 1
          }
        >
          <AirConditionerTechData 
            canEdit={canEdit}
          />
        </ShowOnCondition>
        <ShowOnCondition 
          showWhen={
            entityName === "heater" && 
            parseInt(formWatcher.invoiceDiscount?.value) === 1
          }
        >
          <HeaterTechData 
            canEdit={canEdit}
            fieldsValues={techDataFieldsValues}
          />
        </ShowOnCondition>
        <CadastralData 
          canEdit={canEdit}
          fieldsValues={techDataFieldsValues}
        />
        <ShowOnCondition showWhen={canEdit}>
          <div className="form-buttons">
            <Button
              onClick={() => setSelectedStep(ContractTabsMap.BANK_ACCOUNT_STEP)}
            >
              Indietro
            </Button>
            <ButtonWithLoader
              isLoading={isSubmitting}
              type="submit"
              disabled={isSubmitting}
              label="Avanti"
            />
          </div>
        </ShowOnCondition>
      </Form>
    </FormProvider>
  )
}

export default TechDataForm