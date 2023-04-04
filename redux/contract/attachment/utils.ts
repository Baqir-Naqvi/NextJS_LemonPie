import { getAPIUrl, mutateData } from "../../api/utils";
import { getEntityUriName } from "../contract.utils";

export function uploadAttachment(values: any, entityName: string, accessToken: string) {
  return mutateData(
    `${getAPIUrl()}/${getEntityUriName(entityName!)}/attachments${values.id ? `/${values.id}` : ''}`, 
    accessToken,
    values, 
    values.id ? "PUT" : "POST"
  )
  .then(response => response)
}