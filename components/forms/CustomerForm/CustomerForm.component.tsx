import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { Form } from "reactstrap"

import ButtonWithLoader from "../../ButtonWithLoader/ButtonWithLoader.component"
import GeneralData from "./GeneralData/GeneralData.component"
import ShowOnCondition from "../../auth/ShowOnCondition.component"
import GeneralConditions from "./GeneralConditions/GeneralConditions.component"
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy.component"
import ScrollToTop from "../../ScrollToTop/ScrollToTop.component"
import { useSubmitCustomerDataMutation } from "../../../redux/contract/contract.api"
import { useSelectEntityName, useSetContractData, useSetSelectedStep } from "../../../providers/ContractsFormPageProvider.providers"
import { setDefaultDate } from "../utils/utils"
import { testData } from "./utils"
import { canI } from "../../auth/utils"
import { useAppSelector } from "../../../redux/hooks"
import { selectCurrentUserPermissions } from "../../../redux/auth/auth.selectors"

type CustomerFormProps = {
  customerFieldsValues: FieldValues
  customerData?: any
}

const CustomerForm = ({ 
  customerFieldsValues, 
  customerData,
}: CustomerFormProps) => {
  const currentUserPermissions = useAppSelector(selectCurrentUserPermissions)
  const entityName = useSelectEntityName()
  const canEdit = canI(`${entityName}CREATE`, currentUserPermissions).abilityCheck
  const setContractData = useSetContractData()
  
  const formProps = useForm<FieldValues>({ 
    defaultValues: customerData ? ({
      ...customerData,
      customerBirthDate: setDefaultDate(customerData.customerBirthDate),
      documentIdentityReleaseDate: setDefaultDate(customerData.documentIdentityReleaseDate),
      documentIdentityDueDate: setDefaultDate(customerData.documentIdentityDueDate),
    }) : {
      //TODO delete testData
      // ...testData,
      // customerBirthDate: setDefaultDate(testData.customerBirthDate),
      // documentIdentityReleaseDate: setDefaultDate(testData.documentIdentityReleaseDate),
      // documentIdentityDueDate: setDefaultDate(testData.documentIdentityDueDate),
    }
  })
  const { handleSubmit, formState: { isSubmitting } } = formProps

  const [submitCustomer] = useSubmitCustomerDataMutation()
  const onSubmit = async (values: FieldValues) => {
    const response = await submitCustomer({ values, entityName })
    //Update actual URL with contract id if it's a POST mutation
    if(!values.id && "data" in response) {
      setContractData((prevState: any) => ({
        ...prevState,
        contractId: response.data.id
      }))
    }
  }

  return (
    <FormProvider {...formProps}>
      <ScrollToTop />
      <Form 
        onSubmit={handleSubmit(onSubmit)} 
        className="my-4"
      >
        <GeneralData 
          fieldsValues={customerFieldsValues}
          canEdit={canEdit}
        />
        <GeneralConditions />
        <PrivacyPolicy />
        <ShowOnCondition showWhen={canEdit}>
          <div className="form-buttons">
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

export default CustomerForm