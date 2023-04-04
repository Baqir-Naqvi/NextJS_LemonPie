import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelectEntityName } from "../../providers/ContractsFormPageProvider.providers"

import { selectFormStep } from "../../redux/contract/contract.selectors"
import { getContractTypeLabel } from "../../redux/contract/contract.utils"
import { useAppSelector } from "../../redux/hooks"
import { getFormHeaderIcon, getFormStepHeader } from "./utils"

const ContractHeaders = () => {
  const entityName = useSelectEntityName()
  const selectedStep = useAppSelector(selectFormStep)
  const { title, description } = getFormStepHeader(selectedStep!)

  return (
    <section className="form-header">
      <div className="form-icon">
        <FontAwesomeIcon icon={getFormHeaderIcon(entityName)} />
      </div>
      <div className="form-description">
        <h1 className="form-title">{getContractTypeLabel(entityName)}</h1>
        <h5 className="form-subtitle">{title}</h5>
        <p>
          {description}
        </p>
      </div>
    </section>
  )
}

export default ContractHeaders