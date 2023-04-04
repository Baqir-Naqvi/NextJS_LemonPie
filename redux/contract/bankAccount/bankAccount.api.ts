import { api } from "../../api"
import { getEntityUriName } from "../contract.utils"

export const bankAccountApi = api.injectEndpoints({
  endpoints: build => ({
    fetchContractBankAccount: build.query({
      query: ({ contractId, entityName }) => ({
        url: `${getEntityUriName(entityName)}/bank-account-details?contractId=${contractId}`
      }),
      providesTags: (result, error, args) => [{ type: "BankAccount" }],
    }),
    submitContractBankAccount: build.mutation({
      query: ({ values, entityName }) => ({
        url: `${getEntityUriName(entityName)}/bank-account-details${values.id ? `/${values.id}` : ''}`,
        method: values.id ? "PUT" : "POST",
        body: values
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Contract" },
        { type: "BankAccount" }
      ],
    })
  })
})

export const {
  useFetchContractBankAccountQuery,
  useSubmitContractBankAccountMutation,
} = bankAccountApi