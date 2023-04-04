import { setDefaultDate } from "../utils/utils";

export const payerDefaultValue = { value: '1', label: 'Cliente' }
export const guarantorDefaultValue = { value: '2', label: 'No' }

export function setDefaultFormData(bankAccountDetailData?: any) {
  return bankAccountDetailData ? ({
    ...bankAccountDetailData,
    value: bankAccountDetailData.value || null,
    valueToFinance: bankAccountDetailData.valueToFinance || null,
    netIncome: bankAccountDetailData.netIncome || null,
    guarantorValue: bankAccountDetailData.guarantorValue || null,
    guarantorPaymentsNo: bankAccountDetailData.guarantorPaymentsNo || null,
    guarantorValueToFinance: bankAccountDetailData.guarantorValueToFinance || null,
    guarantorNetIncome: bankAccountDetailData.guarantorNetIncome || null,
    residentSince: setDefaultDate(bankAccountDetailData.residentSince),
    employedFrom: setDefaultDate(bankAccountDetailData.employedFrom),
    guarantorBirthDate: setDefaultDate(bankAccountDetailData.guarantorBirthDate),
    guarantorResidentSince: setDefaultDate(bankAccountDetailData.guarantorResidentSince),
    guarantorDocumentIdentityReleaseDate: setDefaultDate(bankAccountDetailData.guarantorDocumentIdentityReleaseDate),
    guarantorDocumentIdentityDueDate: setDefaultDate(bankAccountDetailData.guarantorDocumentIdentityDueDate),
    guarantorEmployedFrom: setDefaultDate(bankAccountDetailData.guarantorEmployedFrom),
  }) : ({
    value: null,
    valueToFinance: null,
    netIncome: null,
    guarantorValue: null,
    guarantorPaymentsNo: null,
    guarantorValueToFinance: null,
    guarantorNetIncome: null,
    payer: payerDefaultValue,
  })
}