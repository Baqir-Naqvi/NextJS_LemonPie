import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import PrivacyPolicyText from "./PrivacyPolicyText.component"

type PrivacyPolicyModalProps = {
  isOpen: boolean
  toggle: () => void
}

const PrivacyPolicyModal = ({
  isOpen,
  toggle,
}: PrivacyPolicyModalProps) => (
  <Modal isOpen={isOpen} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>
      <FontAwesomeIcon icon={['far', 'clipboard-check']} className="me-2" />
      Informativa privacy
    </ModalHeader>
    <ModalBody>
      <PrivacyPolicyText />
    </ModalBody>
    <ModalFooter>
      <Button onClick={toggle}>Chiudi</Button>
    </ModalFooter>
  </Modal>
)

export default PrivacyPolicyModal