import { useEffect, useMemo, useState } from "react"
import { Container } from "reactstrap"
import Head from "next/head"

import ContractFormContainer from "../../components/ContractFormContainer/ContractFormContainer.component"
import ContractHeaders from "../../components/ContractHeaders/ContractHeaders.component"
import ContractTabs from "../../components/ContractTabs/ContractTabs.component"
import ShowOnCondition from "../../components/auth/ShowOnCondition.component"
import { ContractTabsMap, getEntityNameFromPath } from "../../redux/contract/contract.utils"
import { ContractsPageContext } from "../../providers/ContractsFormPageProvider.providers"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { changeSelectedStep } from "../../redux/contract/contract.actions"
import { selectFormStep } from "../../redux/contract/contract.selectors"

const Conditizionatore = () => {
  const dispatch = useAppDispatch()
  const entityName = useMemo(() => getEntityNameFromPath("condizionatore"), [])
  //Set shared contract data like entityName/contractId for easy retrieve in children components
  const [isContractFinalized, setIsContractFinalized] = useState(false)
  const [contractData, setContractData] = useState<{[key: string]: any}>({ entityName })
  const selectedStep = useAppSelector(selectFormStep)
  const setSelectedStep = (step: ContractTabsMap) => dispatch(changeSelectedStep(step))

  useEffect(() => {
    return () => { setSelectedStep(ContractTabsMap.CUSTOMER_DATA_STEP) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ContractsPageContext.Provider
      value={{
        contractData,
        setContractData,
        selectedStep,
        setSelectedStep,
        isContractFinalized,
        setIsContractFinalized,
      }}
    >
      <Head>
        <title>Comfort Home Solutions - Sottoscrizione contratto condizionatore</title>
      </Head>
      <Container className="form-container">
        <ShowOnCondition showWhen={isContractFinalized === false}>
          <ContractHeaders />
          <ContractTabs />
        </ShowOnCondition>
        <ContractFormContainer />
      </Container>
    </ContractsPageContext.Provider>
  )
}

export default Conditizionatore