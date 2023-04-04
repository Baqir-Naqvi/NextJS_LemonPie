import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FieldValues } from "react-hook-form"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

import { CustomerTypes, getCustomerType } from "../../utils/utils"
import BusinessText from "./BusinessText.component"
import DomesticText from "./DomesticText.component"

type GeneralConditionsModalProps = {
  isOpen: boolean
  toggle: () => void
  formWatcher: FieldValues
}

const GeneralConditionsModal = ({
  isOpen,
  toggle,
  formWatcher,
}: GeneralConditionsModalProps) => (
  <Modal isOpen={isOpen} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>
      <FontAwesomeIcon icon={['far', 'clipboard-check']} className="me-2" />
      Condizioni Generali di Contratto
    </ModalHeader>
    <ModalBody>
      {getCustomerType(CustomerTypes.DOMESTIC_CUSTOMER, formWatcher.customerType) &&
        <DomesticText />
      }
      {getCustomerType(CustomerTypes.BUSINESS_CUSTOMER, formWatcher.customerType) &&
        <BusinessText />
      }
    </ModalBody>
    <ModalFooter>
      <Button onClick={toggle}>Chiudi</Button>
    </ModalFooter>
  </Modal>
)

export default GeneralConditionsModal