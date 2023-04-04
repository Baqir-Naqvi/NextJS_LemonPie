type LanguageOption = {
  value: string
  label: string
  default: boolean
}

export function getDefaultOption(options: LanguageOption[]) {
  if(options) {
    const defaultOption = options.filter(opt => opt.default === true)
    return defaultOption.length ? defaultOption[0] : null
  }
}

export function relatedSwitchVisibility(entityName: string) {
  return entityName === 'transfer' ? true : false
}

export function electronicInvoiceRecipientCodeVisibility(entityName: string) {
  return (
    entityName === 'changeSupplier' ||
    entityName === 'transfer' ||
    entityName === 'takeover' ||
    entityName === 'newActivation' ||
    entityName === 'newConnection' ||
    entityName === 'contextualTransferEe' ||
    entityName === 'contextualTransferGas'
  ) ? true : false
}

export function extendedCompanyDataVisibility(entityName: string) {
  return (
    entityName === 'newActivation' ||
    entityName === 'newConnection'
  ) ? true : false
}

export function singleInvoicePodVisibility(entityName: string) {
  return (
    entityName === 'changeSupplier' ||
    entityName === 'transfer' ||
    entityName === 'contextualTransferEe' ||
    entityName === 'newActivation' ||
    entityName === 'takeover' ||
    entityName === 'newConnection'
  ) ? true : false
}

export function singleInvoicePdrVisibility(entityName: string) {
  return (
    entityName === 'changeSupplier' ||
    entityName === 'transfer' ||
    entityName === 'contextualTransferGas' ||
    entityName === 'newActivation' ||
    entityName === 'takeover'
  ) ? true : false
}

export function propertyTypeVisibility(entityName: string) {
  return (
    entityName === 'changeSupplier' ||
    entityName === 'takeover' ||
    entityName === 'newActivation' ||
    entityName === 'newConnection'
  ) ? true : false
}

export function isMortisCausaVisibility(entityName: string) {
  return (
    entityName === 'transfer' ||
    entityName === 'contextualTransferEe' ||
    entityName === 'contextualTransferGas'
  ) ? true : false
}

export function hasReconsiderationVisibility(entityName: string) {
  return (
    entityName === 'changeSupplier' ||
    entityName === 'newActivation' ||
    entityName === 'newConnection' ||
    entityName === 'contextualTransferEe' ||
    entityName === 'contextualTransferGas'
  ) ? true : false
}

export const testData = {
    customerName:"pino",
    customerSurname:"pino",
    customerBirthPlace: { 
      town: "Bergamo",
      province: "BG"
    },
    customerBirthProvince: "BG",
    customerBirthDate: "1984-03-24T00:00:00.000Z",
    residenceTown: {
      town: "Bergamo",
      province: "BG"
    },
    residenceAddress: "via pino",
    residenceCivicNo: "3",
    residenceProvince: "BG",
    residencePostalCode: { label: "24121", value: "24121" },
    customerFiscalCode: "CRRMHL84C24A794O", 
    documentIdentityType: { value: "1", label: "Carta d'identità" },
    customerIdentityNo: "123",
    customerIdentityEntity: { value: "1", label: "Comune" },
    documentIdentityReleaseDate: "2022-12-14T00:00:00.000Z",
    documentIdentityDueDate: "2022-12-14T00:00:00.000Z",
    documentIdentityReleaseTown: {
      town: "Bergamo",
      province: "BG"
    },
    documentIdentityReleaseProvince: "BG",
    customerPhoneNo: "3398159889",
    customerMobilePhoneNo: "3398159889",
    customerEmail: "pin@pino.it",
    domicileEqualsResidence: { value: "1", label: "Si" },
    customerType: { value: "1", label: "Domestico" },
    generalConditions: true, 
    directMarketing: "false",
    indirectMarketing: "false"
}