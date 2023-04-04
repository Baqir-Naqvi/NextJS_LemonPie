import { useMemo } from "react"

import WithSkeleton from "../../WithSkeleton/WithSkeleton.component"
import AttachmentsForm from "./AttachmentsForm.component"
import { selectContractCustomerData } from "../../../redux/contract/contract.selectors"
import { useAppSelector } from "../../../redux/hooks"
import { useFetchAttachmentsQuery } from "../../../redux/contract/attachment/attachment.api"
import { useSelectContractId, useSelectEntityName } from "../../../providers/ContractsFormPageProvider.providers"

const AttachmentsFormWithSkeleton = WithSkeleton(AttachmentsForm)

const AttachmentsFormContainer = () => {
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()

  //Select contract data with permissions
  const selectCustomerData = useMemo(() => selectContractCustomerData({ entityName, contractId }), [entityName, contractId])
  const { data: customerData } = useAppSelector(selectCustomerData)

  const {
    data: attachmentsData,
    isFetching: isFetchingAttachmentsData,
    isLoading: isLoadingAttachmentsData,
  } = useFetchAttachmentsQuery({ entityName, contractId })
  const fetchingAttachmentsData = isFetchingAttachmentsData || isLoadingAttachmentsData

  return (
    <AttachmentsFormWithSkeleton
      isLoading={fetchingAttachmentsData}
      permissions={customerData?.links}
      entityName={entityName}
      contractId={contractId}
      attachmentsData={attachmentsData}
    />
  )
}

export default AttachmentsFormContainer