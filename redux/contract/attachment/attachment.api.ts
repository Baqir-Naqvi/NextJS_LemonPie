import { getCurrentUser } from "../../../firebase"
import { api } from "../../api"
import { ResponseType } from "../../api/types"
import { AttachmentItemType } from "../contract.types"
import { getEntityUriName } from "../contract.utils"
import { uploadAttachment } from "./utils"

export const attachmentApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAttachments: build.query({
      query: ({ entityName, contractId }) => ({
        url: `${getEntityUriName(entityName!)}/attachments?contractId=${contractId}`
      }),
      providesTags: (result, error, args) => [
        ...result.map((item: any) => ({ type: "Attachment", id: item.id } as const)),
        { type: "Attachment" as const, id: "LIST"}
      ],
      transformResponse: (response: ResponseType, meta, arg) => response.data,
    }),
    submitAttachments: build.mutation({
      async queryFn({ attachments, entityName }) {
        const firebaseUser = await getCurrentUser()
        const token = await firebaseUser.getIdToken()
        const result = await Promise.allSettled(
          attachments.map((attachmentData: AttachmentItemType) => 
            uploadAttachment(attachmentData, entityName, token)
          )
        )
        return { data: result }
      },
      invalidatesTags: (result, error, args) => [
        { type: "Contract" },
        { type: "Attachment", id: "LIST"}
      ],
    }),
    deleteAttachment: build.mutation({
      query: (actionUrl: string) => ({
        url: actionUrl,
        method: "DELETE"
      }),
      invalidatesTags: (response, error, args) => [
        { type: "Attachment", id: "LIST"},
      ],
    }),
  }),
})

export const {
  useFetchAttachmentsQuery,
  useSubmitAttachmentsMutation,
  useDeleteAttachmentMutation,
} = attachmentApi