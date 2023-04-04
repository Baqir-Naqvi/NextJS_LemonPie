import { createContext, useContext } from "react"
import { ContractTabsMap } from "../redux/contract/contract.utils"

export type ContractsPageContent = {
  contractData: Record<string, any>
  setContractData: (args: { [key: string]: any }) => void
  selectedStep?: ContractTabsMap
  setSelectedStep?: (step: ContractTabsMap) => void
  isContractFinalized: boolean
  setIsContractFinalized: (isContractFinalized: boolean) => void
}
export const ContractsPageContext = createContext<ContractsPageContent>({
  contractData: {},
  setContractData: () => {},
  selectedStep: ContractTabsMap.CUSTOMER_DATA_STEP,
  setSelectedStep: () => {},
  isContractFinalized: false,
  setIsContractFinalized: () => {},
})

export const useContractsFormPageContext = () => useContext(ContractsPageContext)

export const useSelectEntityName = () => {
  const { contractData } = useContractsFormPageContext()
  return contractData?.entityName ?? ""
}

export const useSelectContractId = () => {
  const { contractData } = useContractsFormPageContext()
  return contractData?.contractId ?? ""
}

export const useSelectContractIsFinalized = () => {
  const { isContractFinalized } = useContractsFormPageContext()
  return isContractFinalized
}

export const useSelectSelectedStep = () => {
  const { selectedStep } = useContractsFormPageContext()
  return selectedStep
}

export const useSetSelectedStep = () => {
  const { setSelectedStep } = useContractsFormPageContext()
  return setSelectedStep
}

export const useSetContractData = () => {
  const { setContractData } = useContractsFormPageContext()
  return setContractData
}

export const useSetIsContractFinalized = () => {
  const { setIsContractFinalized } = useContractsFormPageContext()
  return setIsContractFinalized
}