import { Permissions } from "../api/types"

export type CustomerDataType = {
  links: Permissions
  contractStatus: 1
  directMarketing: true
  domicileEqualsResidence: true
  generalConditions: true
  indirectMarketing: true
  documentIdentityDueDate: Date
  documentIdentityReleaseDate: Date
  insertDate: Date
  customerBirthDate: Date
  coveredSquareMeters: number
  documentIdentityType: {
    value: number
    label: string
  }
  customerIdentityEntity: {
    value: string
    label: string
  }
  customerSex: {
    value: string
    label: string
  }
  customerType: {
    value: string
    label: string
  }
  id: string
  userId: string
  companyName: string
  customerBirthPlace: string
  customerBirthProvince: string
  customerEmail: string
  customerFiscalCode: string
  customerIdentityNo: string
  customerMobilePhoneNo: string
  customerName: string
  customerPhoneNo: string
  customerSurname: string
  documentIdentityReleaseProvince: string
  documentIdentityReleaseTown: string
  domicileAddress: string
  domicileCivicNo: string
  domicilePostalCode: string
  domicileProvince: string
  domicileTown: string
  headOfficeAddress: string
  headOfficeCivicNo: string
  headOfficePostalCode: string
  headOfficeProvince: string
  headOfficeTown: string
  offerNumber: string
  residenceAddress: string
  residenceCivicNo: string
  residencePostalCode: string
  residenceProvince: string
  residenceTown: string
  vatNo: string
}

export type BankAccountItemData = {
  name: string
  surname: string
  iban: string
  fiscalCode: string
  links: Permissions
  id: string
  paymentModeId: Record<string, unknown>
  billingTimeId: Record<string, unknown>
}

export type AttachmentItemType = {
  links: Permissions
  insertDate: Date
  id: string
  userFileName: string
  attachmentTypeId: number
  internalFileURL: string
  contractId: string
  contractStatus: number
}