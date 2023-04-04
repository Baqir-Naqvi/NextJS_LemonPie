import { Control, DeepMap, FieldError, FieldValues, UseFieldArrayRemove, UseFormRegister } from "react-hook-form"
import moment from 'moment-timezone'
import { Button, Col } from "reactstrap"

import AttachmentRowStyle from "./style"
import InputWrapper from "../../inputFields/Input/InputWrapper.component"
import ShowOnCondition from "../../../auth/ShowOnCondition.component"
import TextAreaWrapper from "../../inputFields/TextArea/TextAreaWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CanI from "../../../auth/CanI.component"
import DeleteItem from "../../../DeleteItemModal/DeleteItemModal.component"
import { useDeleteAttachmentMutation } from "../../../../redux/contract/attachment/attachment.api"
import { useState } from "react"

export type AttachmentRowProps = {
  index: number
  register: UseFormRegister<FieldValues>
  field: any
  control: Control<FieldValues, any>
  errors: Partial<DeepMap<FieldValues, FieldError>>
  entityName: string
  removeFile: UseFieldArrayRemove
  isSubmitting: boolean
}

const AttachmentRow = ({
  index,
  field,
  register,
  entityName,
  removeFile,
  isSubmitting
}: AttachmentRowProps) => {
  const [deleteItem, { isLoading: isDeletingItem }] = useDeleteAttachmentMutation()
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const toggleDelete = () => setDeleteIsOpen(prevState => !prevState)

  return (
    <AttachmentRowStyle>
      <Col md={12} lg={5}>
        <InputWrapper 
          type="text"
          className="form-control"
          label="File"
          name={`dropzoneRow.${index}.userFileName` as const}
          rules={{ required: errorFormLabels.REQUIRED }}
          readOnly
          register={register}
        />
      </Col>
      <ShowOnCondition showWhen={(isSubmitting && !field.insertDate)}>
        <Col md={6} className="align-self-center">
          <p className="small text-center my-0">Operazione in corso...</p>
        </Col>
      </ShowOnCondition>
      <ShowOnCondition showWhen={(!isSubmitting || field.insertDate)}>
        <Col md={12} lg={6}>
          <TextAreaWrapper 
            name={`dropzoneRow.${index}.attachmentTypeDescription` as const}
            register={register}
            label="Descrizione"
            className="form-control"
          />
        </Col>
        <Col md={12} lg={1}>
          <div className="action-buttons">
            <ShowOnCondition showWhen={field.internalFileURL}>
              <Button
                color="info"
                size="sm"
                href={field.internalFileURL}
                title="Scarica allegato"
                outline
              >
                <FontAwesomeIcon icon={['far', 'download']} />
              </Button>
            </ShowOnCondition>
            <ShowOnCondition showWhen={field.links}>
              <CanI doWhat="DELETE" withPermissions={field?.links || []} entityName={`${entityName}Attachment`}>
                {({ action }) => (
                  <>
                    <Button 
                      outline 
                      size="sm" 
                      color="danger"
                      title="Elimina"
                      onClick={toggleDelete}
                    >
                      <FontAwesomeIcon icon={['far', 'trash-alt']} size="sm" />
                    </Button>
                    <DeleteItem
                      isOpen={deleteIsOpen}
                      toggle={toggleDelete}
                      deleteFn={async () => {
                        await deleteItem(action)
                        toggleDelete()
                      }}
                      isDeleting={isDeletingItem}
                    />
                  </>
                )}
              </CanI>
            </ShowOnCondition>
            <ShowOnCondition showWhen={!field.links}>
              <Button 
                size="sm" 
                color="danger"
                title="Elimina"
                onClick={() => removeFile(index)}
                outline
              >
                <FontAwesomeIcon icon={['far', 'trash-alt']} size="sm" />
              </Button>
            </ShowOnCondition>
          </div>
        </Col>
      </ShowOnCondition>
    </AttachmentRowStyle>
  )
}

export default AttachmentRow