import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { Button, Form } from "reactstrap"

import CustomerFinancing from "./CustomerFinancing/CustomerFinancing.component"
import GuarantorFinancing from "./GuarantorFinancing/GuarantorFinancing.component"
import PaymentType from "./PaymentType/PaymentType.component"
import ShowOnCondition from "../../auth/ShowOnCondition.component"
import ButtonWithLoader from "../../ButtonWithLoader/ButtonWithLoader.component"
import ScrollToTop from "../../ScrollToTop/ScrollToTop.component"
import { useSelectContractId, useSelectEntityName, useSetSelectedStep } from "../../../providers/ContractsFormPageProvider.providers"
import { Permissions } from "../../../redux/api/types"
import { useSubmitContractBankAccountMutation } from "../../../redux/contract/bankAccount/bankAccount.api"
import { canI } from "../../auth/utils"
import { useWhenFieldChangesHook } from "../hooks/useWhenFieldChangesHook.hooks"
import { guarantorDefaultValue, payerDefaultValue, setDefaultFormData } from "./utils"
import { ContractTabsMap } from "../../../redux/contract/contract.utils"

type BankAccountFormProps = {
  bankAccountFieldsValues: FieldValues
  bankAccountDetailData?: any
  permissions: Permissions
}

const BankAccountForm = ({
  bankAccountFieldsValues,
  bankAccountDetailData,
  permissions
}: BankAccountFormProps) => {  
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()
  const setSelectedStep = useSetSelectedStep()!
  let canEdit = canI(`${entityName}BankAccountDetailCREATE`, permissions).abilityCheck
  if(bankAccountDetailData) {
    canEdit = canI(`${entityName}BankAccountDetailUPDATE`, bankAccountDetailData.links).abilityCheck
  }

  const formProps = useForm<FieldValues>({ 
    defaultValues: {
      contractId,
      ...setDefaultFormData(bankAccountDetailData)
    }
  })
  const { handleSubmit, watch, setValue, formState: { isSubmitting } } = formProps
  const [submitBankAccount] = useSubmitContractBankAccountMutation()
  const onSubmit = async (values: FieldValues) => {
    await submitBankAccount({ values, entityName })
  }
  
  useWhenFieldChangesHook({ 
    watch,
    field: "paymentMode", 
    set: "payer", 
    to: payerDefaultValue,
    setValue
  })

  useWhenFieldChangesHook({ 
    watch,
    field: "paymentMode", 
    set: "guarantor", 
    to: guarantorDefaultValue,
    setValue
  })

  useWhenFieldChangesHook({ 
    watch,
    field: "guarantor", 
    set: "payer", 
    to: payerDefaultValue,
    setValue
  })

  return (
    <FormProvider {...formProps}>
      <ScrollToTop />
      <Form 
        onSubmit={handleSubmit(onSubmit)}
        className="my-5"
      >
        <PaymentType 
          canEdit={canEdit}
          fieldsValues={bankAccountFieldsValues}
        />
        <CustomerFinancing 
          canEdit={canEdit}
          fieldsValues={bankAccountFieldsValues}
        />
        <GuarantorFinancing 
          canEdit={canEdit}
          fieldsValues={bankAccountFieldsValues}
        />
        <ShowOnCondition showWhen={canEdit}>
          <div className="form-buttons">
            <Button
              onClick={() => setSelectedStep(ContractTabsMap.CUSTOMER_DATA_STEP)}
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

export default BankAccountForm