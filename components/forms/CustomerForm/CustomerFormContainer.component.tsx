import { FieldValues } from "react-hook-form"

import { useSelectEntityName } from "../../../providers/ContractsFormPageProvider.providers"
import { useFetchFormFieldsValuesQuery } from "../../../redux/contract/contract.api"

import WithSkeleton from "../../WithSkeleton/WithSkeleton.component"
import CustomerForm from "./CustomerForm.component"

type CustomerFormContainerProps = {
  fetchingCustomerData: boolean
  customerData?: FieldValues
}

const CustomerFormWithSpinner = WithSkeleton(CustomerForm)

const CustomerFormContainer = ({
  fetchingCustomerData,
  customerData,
}: CustomerFormContainerProps) => {
  const entityName = useSelectEntityName()
  
  //Fetch form fields values
  const { 
    data: fieldsValues,
    isFetching: isFetchingFormFields, 
    isLoading: isLoadingFormFields,
  } = useFetchFormFieldsValuesQuery({ entityName, formName: "customer" })
  const fetchingFormfields = isFetchingFormFields || isLoadingFormFields

  const isLoading = fetchingCustomerData || fetchingFormfields

  return (
    <CustomerFormWithSpinner
      customerData={customerData ?? undefined}
      customerFieldsValues={fieldsValues || {}}
      isLoading={isLoading}
    />
  )
}

export default CustomerFormContainer