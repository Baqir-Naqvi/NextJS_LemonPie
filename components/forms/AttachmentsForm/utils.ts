import { FieldValues } from "react-hook-form"
import { AttachmentItemType } from "../../../redux/contract/contract.types"
import { AttachmentsTypeId } from "../utils/utils"

export function setUpSubmitValues(values: FieldValues, contractId: string) {
  let mandatoryAttachments: AttachmentItemType[] = []

  if(!values.mandatory.ciFront.id) {
    mandatoryAttachments.push({
      ...values.mandatory.ciFront,
      contractId,
      attachmentTypeId: AttachmentsTypeId.CI_FRONT_TYPE_ID
    })
  }

  if(!values.mandatory.ciBack.id) {
    mandatoryAttachments.push({
      ...values.mandatory.ciBack,
      contractId,
      attachmentTypeId: AttachmentsTypeId.CI_BACK_TYPE_ID
    })
  }

  if(!values.mandatory.healthInsuranceFront.id) {
    mandatoryAttachments.push({
      ...values.mandatory.healthInsuranceFront,
      contractId,
      attachmentTypeId: AttachmentsTypeId.HEALTH_INSURANCE_FRONT_TYPE_ID
    })
  }

  if(!values.mandatory.healthInsuranceBack.id) {
    mandatoryAttachments.push({
      ...values.mandatory.healthInsuranceBack,
      contractId,
      attachmentTypeId: AttachmentsTypeId.HEALTH_INSURANCE_BACK_TYPE_ID
    })
  }

  const otherAttachments = values.dropzoneRow.map((item: AttachmentItemType) => 
    ({ ...item, contractId: values.contractId }))

  return [ ...mandatoryAttachments, ...otherAttachments ]
}