import { api } from "../../api"
import { getEntityUriName } from "../contract.utils"

export const techDataApi = api.injectEndpoints({
  endpoints: build => ({
    fetchContractTechData: build.query({
      query: ({ contractId, entityName }) => ({
        url: `${getEntityUriName(entityName!)}/tech-data?contractId=${contractId}`
      }),
      providesTags: (result, error, args) => [{ type: "TechData" }],
    }),
    submitContractTechData: build.mutation({
      query: ({ values, entityName }: { values: Record<string, unknown>, entityName: string }) => ({
        url: `${getEntityUriName(entityName!)}/tech-data${values.id ? `/${values.id}` : ''}`,
        method: values.id ? "PUT" : "POST",
        body: values
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Contract" },
        { type: "TechData" }
      ],
    })
  })
})

export const {
  useFetchContractTechDataQuery,
  useSubmitContractTechDataMutation,
} = techDataApi