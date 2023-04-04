import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFieldArray, useFormContext } from "react-hook-form"

import AttachmentsDropzone from "../../../AttachmentsDropzone/AttachmentsDropzone.component"
import AttachmentRow from "../AttachmentRow/AttachmentRow.component"
import { useSelectEntityName } from "../../../../providers/ContractsFormPageProvider.providers"

const OtherAttachments = () => {
  const entityName = useSelectEntityName()
  const { register, control, formState: { errors, isSubmitting } } = useFormContext()
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "dropzoneRow",
  })

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={['far', 'file']} className="me-2" />
        Aggiungi allegati al contratto
      </div>
      <div className="grouped-body">
        <AttachmentsDropzone
          addFile={prepend}
        />
        <section className="attachments-list">
          {fields.map((field, index) => (
            <AttachmentRow
              key={field.id}
              register={register}
              index={index}
              field={field}
              control={control}
              errors={errors}
              entityName={entityName}
              removeFile={remove}
              isSubmitting={isSubmitting}
            />
          ))}
        </section>
      </div>
    </div> 
  )
}

export default OtherAttachments