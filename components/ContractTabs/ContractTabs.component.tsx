import { Nav, NavItem, NavLink } from "reactstrap"
import classNames from 'classnames'

import ContractTabsStyle from "./style"
import { isTabDisabled } from "./utils"
import { ContractTabsMap } from "../../redux/contract/contract.utils"
import { useAppSelector } from "../../redux/hooks"
import { selectMaxFormStepAvailable } from "../../redux/contract/contract.selectors"
import { useSelectContractId, useSelectEntityName, useSelectSelectedStep, useSetSelectedStep } from "../../providers/ContractsFormPageProvider.providers"

const ContractTabs = () => {
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()
  const selectedStep = useSelectSelectedStep()
  const setSelectedStep = useSetSelectedStep()!
  const maxFormStepAvailable = useAppSelector(selectMaxFormStepAvailable({ contractId, entityName }))

  return (
    <ContractTabsStyle>
      <Nav tabs className="subscription-nav">
        <NavItem>
          <NavLink
            onClick={() => setSelectedStep(ContractTabsMap.CUSTOMER_DATA_STEP)}
            className={classNames({ active: selectedStep === ContractTabsMap.CUSTOMER_DATA_STEP })}
          >
            <span className="step-no">1</span>
            <span className="step-label">Dati cliente</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            disabled={isTabDisabled(ContractTabsMap.BANK_ACCOUNT_STEP, maxFormStepAvailable)}
            onClick={() => setSelectedStep(ContractTabsMap.BANK_ACCOUNT_STEP)}
            className={classNames({ active: selectedStep === ContractTabsMap.BANK_ACCOUNT_STEP })}
          >
            <span className="step-no">2</span>
            <span className="step-label">Dati pagamento</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            disabled={isTabDisabled(ContractTabsMap.TECHNICAL_DATA_STEP, maxFormStepAvailable)}
            onClick={() => setSelectedStep(ContractTabsMap.TECHNICAL_DATA_STEP)}
            className={classNames({ active: selectedStep === ContractTabsMap.TECHNICAL_DATA_STEP })}
          >
            <span className="step-no">3</span>
            <span className="step-label">Dati tecnici</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            disabled={isTabDisabled(ContractTabsMap.ATTACHMENTS_STEP, maxFormStepAvailable)}
            onClick={() => setSelectedStep(ContractTabsMap.ATTACHMENTS_STEP)}
            className={classNames({ active: selectedStep === ContractTabsMap.ATTACHMENTS_STEP })}
          >
            <span className="step-no">4</span>
            <span className="step-label">Documenti</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            disabled={isTabDisabled(ContractTabsMap.SIGNATURE_STEP, maxFormStepAvailable)}
            onClick={() => setSelectedStep(ContractTabsMap.SIGNATURE_STEP)}
            className={classNames({ active: selectedStep === ContractTabsMap.SIGNATURE_STEP })}
          >
            <span className="step-no">5</span>
            <span className="step-label">Conferma</span>
          </NavLink>
        </NavItem>
      </Nav>
    </ContractTabsStyle>
  )
}

export default ContractTabs