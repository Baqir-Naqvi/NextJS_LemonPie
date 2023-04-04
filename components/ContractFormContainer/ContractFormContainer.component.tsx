import { useEffect } from "react"

import ShowOnCondition from "../auth/ShowOnCondition.component"
import CustomerFormContainer from "../forms/CustomerForm/CustomerFormContainer.component"
import ContractFormContainerStyle from "./style"
import BankAccountFormContainer from "../forms/BankAccountForm/BankAccountFormContainer.component"
import WithSkeleton from "../WithSkeleton/WithSkeleton.component"
import TechDataFormContainer from "../forms/TechDataForm/TechDataFormContainer.component"
import AttachmentsFormContainer from "../forms/AttachmentsForm/AttachmentsFormContainer.component"
import ConfirmationForm from "../forms/ConfirmationForm/ConfirmationForm.component"
import { useSelectContractId, useSelectEntityName, useSelectSelectedStep } from "../../providers/ContractsFormPageProvider.providers"
import { useLazyFetchContractCustomerDataQuery } from "../../redux/contract/contract.api"
import { ContractTabsMap } from "../../redux/contract/contract.utils"
import { useLoginQuery } from "../../redux/auth/auth.api"

const BankAccountFormContainerWithSkeleton = WithSkeleton(BankAccountFormContainer)

const ContractFormContainer = () => {
  const entityName = useSelectEntityName()
  const selectedStep = useSelectSelectedStep()
  const contractId = useSelectContractId()  

  //Login funnel user
  const { isLoading: isLoggingIn, isError } = useLoginQuery(undefined)

  //Fetch contract general data (with permissions "links")
  const [fetchCustomerData, {
    data: customerData,
    isFetching: isFetchingCustomerData, 
    isLoading: isLoadingCustomerData,
    isUninitialized: isUninitializedCustomerData,
  }] = useLazyFetchContractCustomerDataQuery()
  const fetchingCustomerData = isFetchingCustomerData || isLoadingCustomerData

  const isLoading = fetchingCustomerData || isLoggingIn

  useEffect(() => {
    if(contractId) {
      fetchCustomerData({ contractId, entityName })
    }
  }, [contractId, fetchCustomerData, entityName])

  return (
    <ShowOnCondition showWhen={!isError}>
      <ContractFormContainerStyle>
        <ShowOnCondition showWhen={selectedStep === ContractTabsMap.CUSTOMER_DATA_STEP}>
          <CustomerFormContainer
            fetchingCustomerData={isLoading}
            customerData={customerData ?? undefined}
          />
        </ShowOnCondition>
        <ShowOnCondition showWhen={selectedStep === ContractTabsMap.BANK_ACCOUNT_STEP}>
          <BankAccountFormContainerWithSkeleton 
            isLoading={isLoading || isUninitializedCustomerData}
          />
        </ShowOnCondition>
        <ShowOnCondition showWhen={selectedStep === ContractTabsMap.TECHNICAL_DATA_STEP}>
          <TechDataFormContainer />
        </ShowOnCondition>
        <ShowOnCondition showWhen={selectedStep === ContractTabsMap.ATTACHMENTS_STEP}>
          <AttachmentsFormContainer />
        </ShowOnCondition>
        <ShowOnCondition showWhen={selectedStep === ContractTabsMap.SIGNATURE_STEP}>
          <ConfirmationForm />
        </ShowOnCondition>
      </ContractFormContainerStyle>
    </ShowOnCondition>
  )
}

export default ContractFormContainer