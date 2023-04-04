import { useMemo } from "react"

import WithSkeleton from "../../WithSkeleton/WithSkeleton.component"
import TechDataForm from "./TechDataForm.comopnent"
import { useSelectContractId, useSelectEntityName } from "../../../providers/ContractsFormPageProvider.providers"
import { useFetchFormFieldsValuesQuery } from "../../../redux/contract/contract.api"
import { selectContractCustomerData } from "../../../redux/contract/contract.selectors"
import { useFetchContractTechDataQuery } from "../../../redux/contract/techData/techData.api"
import { useAppSelector } from "../../../redux/hooks"

const TechDataFormWithSpinner = WithSkeleton(TechDataForm)

const TechDataFormContainer = () => {
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()
  const { 
    data: formFields, 
    isFetching: isFetchingFormFields,
    isLoading: isLoadingFormFields
  } = useFetchFormFieldsValuesQuery({ entityName, formName: "techData" })
  const fetchingFormFields = isFetchingFormFields || isLoadingFormFields

  //Select contract data with permissions
  const selectCustomerData = useMemo(() => selectContractCustomerData({ entityName, contractId }), [entityName, contractId])
  const { data: customerData } = useAppSelector(selectCustomerData)

  const {
    data: techData,
    isFetching: isFetchingTechData,
    isLoading: isLoadingTechData,
  } = useFetchContractTechDataQuery({ entityName, contractId })
  const fetchingTechData = isFetchingTechData || isLoadingTechData

  const fetchingData = fetchingTechData || fetchingFormFields

  return (
    <TechDataFormWithSpinner 
      isLoading={fetchingData}
      permissions={customerData.links}
      techDataFieldsValues={formFields ?? {}}
      techData={techData}
      contractId={contractId}
      entityName={entityName}
    />
  )
}

export default TechDataFormContainer