import { useMemo } from "react"

import BankAccountForm from "./BankAccountForm.component"
import WithSkeleton from "../../WithSkeleton/WithSkeleton.component"
import { useSelectContractId, useSelectEntityName } from "../../../providers/ContractsFormPageProvider.providers"
import { useFetchContractBankAccountQuery } from "../../../redux/contract/bankAccount/bankAccount.api"
import { useFetchFormFieldsValuesQuery } from "../../../redux/contract/contract.api"
import { selectContractCustomerData } from "../../../redux/contract/contract.selectors"
import { useAppSelector } from "../../../redux/hooks"

const BankAccountFormWithSpinner = WithSkeleton(BankAccountForm)

const BankAccountFormContainer = () => {
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()
  //Select form fields values
  const { 
    data: formFields,
    isFetching: isFetchingFormFields, 
    isLoading: isLoadingFormFields,
  } = useFetchFormFieldsValuesQuery({ entityName, formName: "bankAccount" })
  const fetchingFormfields = isFetchingFormFields || isLoadingFormFields

  //Select contract data with permissions
  const selectCustomerData = useMemo(() => selectContractCustomerData({ entityName, contractId }), [entityName, contractId])
  const { data: customerData } = useAppSelector(selectCustomerData)
  
  const { 
    data: bankAccountDetailData, 
    isFetching: isFetchingBankAccount, 
    isLoading: isLoadingBankAccount,
  } = useFetchContractBankAccountQuery({ contractId, entityName })
  const fetchingBankAccountData = isFetchingBankAccount || isLoadingBankAccount
  
  const fetchingData = fetchingBankAccountData || fetchingFormfields

  return (
    <BankAccountFormWithSpinner 
      isLoading={fetchingData}
      permissions={customerData.links}
      bankAccountFieldsValues={formFields ?? {}}
      bankAccountDetailData={bankAccountDetailData}
      contractId={contractId}
      entityName={entityName}
    />
  )
}

export default BankAccountFormContainer