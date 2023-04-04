import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ButtonWithLoader from '../ButtonWithLoader/ButtonWithLoader.component'

type DeleteItemProps = {
  isOpen: boolean
  toggle: () => void
  deleteFn: () => void
  isDeleting: boolean
}

const DeleteItem = ({
  isOpen,
  toggle,
  deleteFn,
  isDeleting
}: DeleteItemProps) => {
  return (
    <Modal size="sm" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <FontAwesomeIcon icon={['far', 'exclamation-triangle']} />
      </ModalHeader>
      <ModalBody>
        Eliminare definitivamente questo elemento?
      </ModalBody>
      <ModalFooter>
        <ButtonWithLoader 
          color="danger"
          onClick={deleteFn}
          disabled={isDeleting}
          label="Elimina"
          fontAwesomeIcon={['far', 'trash-alt']}
          isLoading={isDeleting}
        />
        <Button color="secondary" onClick={toggle}>Annulla</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteItem
