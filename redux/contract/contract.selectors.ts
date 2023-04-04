import { createDraftSafeSelector } from "@reduxjs/toolkit"

import { contractApi } from "./contract.api"
import { ContractStatusMap, ContractTabsMap, getFormStep } from "./contract.utils"
import { RootState } from "../store"

export const selectContract = (state: RootState) => state.contract

type selectContractCustomerDataArgs = {
  contractId?: string
  entityName: string
}
export const selectContractCustomerData = (args: selectContractCustomerDataArgs) => 
  contractApi.endpoints.fetchContractCustomerData.select(args)

export const selectFormFieldsValues = (entityName: string) => 
  contractApi.endpoints.fetchFormFieldsValues.select(entityName)

export const selectContractStatusId = (args: selectContractCustomerDataArgs) => createDraftSafeSelector(
  [selectContractCustomerData(args)],
  ({ data: customerData }) => customerData?.statusId ?? ContractStatusMap.ONGOING_STATUS
)

export const selectMaxFormStepAvailable = (args: selectContractCustomerDataArgs) => createDraftSafeSelector(
  [selectContractCustomerData(args)],
  ({ data: customerData }) => {
    return customerData ? (
      getFormStep(customerData.steps ?? {}) 
    ) : (
      ContractTabsMap.CUSTOMER_DATA_STEP
    )
  }
)

export const selectFormStep = createDraftSafeSelector(
  [selectContract],
  contract => contract.selectedStep
)