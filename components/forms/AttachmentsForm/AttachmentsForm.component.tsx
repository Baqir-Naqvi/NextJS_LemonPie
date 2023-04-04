import { useMemo } from "react"
import { createSelector } from "@reduxjs/toolkit"
import { FieldValues, FormProvider, useForm } from "react-hook-form"
import { Button, Form } from "reactstrap"

import CanI from "../../auth/CanI.component"
import ButtonWithLoader from "../../ButtonWithLoader/ButtonWithLoader.component"
import CiDropzone from "./CiDropzone/CiDropzone.component"
import HealthInsuranceDropzone from "./HealthInsuranceDropzone/HealthInsuranceDropzone.component"
import OtherAttachments from "./OtherAttachments/OtherAttachments.component"
import ScrollToTop from "../../ScrollToTop/ScrollToTop.component"
import { Permissions } from "../../../redux/api/types"
import { useFetchAttachmentsQuery, useSubmitAttachmentsMutation } from "../../../redux/contract/attachment/attachment.api"
import { AttachmentItemType } from "../../../redux/contract/contract.types"
import { AttachmentsTypeId } from "../utils/utils"
import { setUpSubmitValues } from "./utils"
import { canI } from "../../auth/utils"
import { useSelectContractId, useSelectEntityName, useSetSelectedStep } from "../../../providers/ContractsFormPageProvider.providers"
import { ContractTabsMap } from "../../../redux/contract/contract.utils"

type AttachmentsFormProps = {
  permissions: Permissions
  attachmentsData?: { data: [] }
}

const AttachmentsForm = ({
  permissions,
  attachmentsData
}: AttachmentsFormProps) => {  
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()  
  const setSelectedStep = useSetSelectedStep()!

  const selectAttachmentFileByTypeId = useMemo(() => {
    return createSelector(
      (res: AttachmentItemType[]) => res ?? [],
      (data: AttachmentItemType[], typeId: number | null) => typeId,
      (data, typeId) => data.filter(file => file.attachmentTypeId === typeId),
    )
  }, [])

  //Select specific file types from list
  const { 
    ciFront, 
    ciBack,
    healthInsuranceFront,
    healthInsuranceBack,
    otherAttachments,
  } = useFetchAttachmentsQuery({ entityName, contractId }, {
    selectFromResult: ({ data }) => ({
      ciFront: selectAttachmentFileByTypeId(data, AttachmentsTypeId.CI_FRONT_TYPE_ID)[0],
      ciBack: selectAttachmentFileByTypeId(data, AttachmentsTypeId.CI_BACK_TYPE_ID)[0],
      healthInsuranceFront: selectAttachmentFileByTypeId(data, AttachmentsTypeId.HEALTH_INSURANCE_FRONT_TYPE_ID)[0],
      healthInsuranceBack: selectAttachmentFileByTypeId(data, AttachmentsTypeId.HEALTH_INSURANCE_BACK_TYPE_ID)[0],
      otherAttachments: selectAttachmentFileByTypeId(data, null),
    }),
  })  

  const [submitAttachments] = useSubmitAttachmentsMutation()
  const formProps = useForm<FieldValues>({
    defaultValues: attachmentsData ? ({
      contractId,
      mandatory: {
        ciFront,
        ciBack,
        healthInsuranceFront,
        healthInsuranceBack,
      },
      dropzoneRow: otherAttachments,
    }) : ({
      contractId,
    })
  })
  const { handleSubmit, formState: { isSubmitting } } = formProps  
  
  const onSubmit = async (values: FieldValues) => {
    const attachments = setUpSubmitValues(values, contractId)
    await submitAttachments({ attachments, entityName })
  }

  return (
    <FormProvider {...formProps}>
      <ScrollToTop />
      <Form 
        onSubmit={handleSubmit(onSubmit)}
        className="my-5"
      >
        <CiDropzone 
          canEdit={canI(`${entityName}AttachmentCREATE`, permissions).abilityCheck}
        />
        <HealthInsuranceDropzone 
          canEdit={canI(`${entityName}AttachmentCREATE`, permissions).abilityCheck}
        />
        <CanI doWhat="CREATE" withPermissions={permissions} entityName={`${entityName}Attachment`}>
          {() => (
            <>
              <OtherAttachments />
              <div className="form-buttons">
                <Button
                  onClick={() => setSelectedStep(ContractTabsMap.TECHNICAL_DATA_STEP)}
                >
                  Indietro
                </Button>
                <ButtonWithLoader
                  isLoading={isSubmitting}
                  type="submit"
                  disabled={isSubmitting}
                  label="Carica allegati"
                  fontAwesomeIcon={["far", "upload"]}
                />
              </div>
            </>
          )}
        </CanI>
      </Form>
    </FormProvider>
  )
}

export default AttachmentsForm