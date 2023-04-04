import { api } from "../api"
import { ContractMutationResponseType, ResponseType } from "../api/types"
import { getEntityUriName } from "./contract.utils"

export const contractApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchFormFieldsValues: build.query({
      query: ({ entityName, formName }) => ({
        url: `form-items?formName=${formName}&contractType=${entityName}`,
      }),
      transformResponse: (response, meta, arg) => response,
    }),
    fetchTowns: build.query({
      query: (searchedValue: string) => ({
        url: `form-items/towns/small-info?townName=${searchedValue}`,
      }),
      transformResponse: (response: ResponseType, meta, arg) => response.data,
    }),
    fetchPostalCodes: build.query({
      query: (searchedValue: string) => ({
        url: `form-items/postal-codes?townName=${searchedValue}`,
      }),
      transformResponse: (response: ResponseType, meta, arg) => response.data,
    }),
    fetchContractCustomerData: build.query({
      query: ({ entityName, contractId }) => ({
        url: `${getEntityUriName(entityName)}/${contractId}/`,
      }),
      providesTags: (result, error, { contractId }) => [{ type: "Contract", id: contractId }],
    }),
    submitCustomerData: build.mutation<ContractMutationResponseType, any>({
      query: ({
        values,
        entityName,
      }: {
        values: Record<string, unknown>
        entityName: string
      }) => ({
        url: `${getEntityUriName(entityName!)}${
          values.id ? `/${values.id}` : ``
        }`,
        method: values.id ? "PUT" : "POST",
        body: values,
      }),
      invalidatesTags: (response, error, args) => [{ type: "Contract", id: response?.id }],
    }),
    contractFinalization: build.mutation({
      query: (apiUrl) => ({
        url: apiUrl,
        method: "POST",
      }),
    })
  }),
})

export const {
  useFetchFormFieldsValuesQuery,
  useFetchContractCustomerDataQuery,
  useLazyFetchContractCustomerDataQuery,
  useSubmitCustomerDataMutation,
  useContractFinalizationMutation,
} = contractApi
