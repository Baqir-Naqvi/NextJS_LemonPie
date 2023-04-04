import { createReducer } from "@reduxjs/toolkit"
import { changeSelectedStep } from "./contract.actions"
import { contractApi } from "./contract.api"

import { ContractTabsMap, getFormStep } from "./contract.utils"

type ContractState = {
  selectedStep: number
}

const INITIAL_STATE: ContractState = {
  selectedStep: ContractTabsMap.CUSTOMER_DATA_STEP, //Form selected step id => see ContractTabsMap
}

const contractReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(changeSelectedStep, (state, action) => {
      state.selectedStep = action.payload
    })
    .addMatcher(contractApi.endpoints.fetchContractCustomerData.matchFulfilled, (state, action) => {
      if(action.payload) {
        state.selectedStep = getFormStep(action.payload.steps)
      }
    })
})

export default contractReducer