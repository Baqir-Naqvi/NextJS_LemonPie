export enum ContractTabsMap {
  CUSTOMER_DATA_STEP = 1,
  BANK_ACCOUNT_STEP = 2,
  TECHNICAL_DATA_STEP = 3,
  PRODUCT_STEP = 4,
  ATTACHMENTS_STEP = 5,
  SIGNATURE_STEP = 6
}

export enum ContractStatusMap {
  ONGOING_STATUS = 10,
  TO_COMPLETE_STATUS = 15,
  DONE_STATUS = 20,
  WAITING_SIGNATURE_STATUS = 30,
  SIGNED_STATUS = 40,
  DUPLICATE_STATUS = 50,
  KO_STATUS = 60,
}

export type ContractStep = {
  hasCustomer: boolean
  hasBankAccount: boolean
  hasTechData: boolean
  hasProduct: boolean
  hasAttachments: boolean
}

export function getFormStep(contractStep: ContractStep) {
  const { 
    hasCustomer, 
    hasBankAccount, 
    hasTechData, 
    hasAttachments,
  } = contractStep
  if(hasAttachments) return ContractTabsMap.SIGNATURE_STEP
  if(hasTechData) return ContractTabsMap.ATTACHMENTS_STEP
  if(hasBankAccount) return ContractTabsMap.TECHNICAL_DATA_STEP
  if(hasCustomer) return ContractTabsMap.BANK_ACCOUNT_STEP
  return ContractTabsMap.CUSTOMER_DATA_STEP
}

export function getContractStatusIcon(supplyPointStatusId: number) {
  switch(supplyPointStatusId) {
    case 2:
      return "file-check"

    case 3:
      return "clock"

    case 4:
      return "signature"

    case 5:
      return "copy"

    case 6:
      return "circle-xmark"

    default:
      return "door-open"
  }
}

export function getItemStatusLabel(supplyPointStatusId: number) {
  switch(supplyPointStatusId) {
    case 2:
      return "Inserito"

    case 3:
      return "Attesa firma"

    case 4:
      return "Firmato"

    case 5:
      return "Duplicato"

    case 6:
      return "K.O."

    default:
      return "In inserimento"
  }
}

export function getEntityLabelFromPath(pathName: string | undefined) {
  switch(pathName) {
    case 'caldaia':
      return 'Caldaia'

    case 'condizionatore':
      return 'Condizionatore'

    case 'utenti':
      return 'Utenti'

    default:
      return 'all'
  }
}

export const getContractTypeLabel = (entityName: string) => {
  switch(entityName!) {
    case 'heater':
        return 'Caldaia'

    case 'airConditioner':
      return 'Condizionatore'

    default:
      return ''
  }
}

export function getEntityUriName(entityName: string) {
  switch(entityName!) {
    case 'heater':
      return 'heaters'

    case 'airConditioner':
      return 'air-conditioners'

    case 'user':
      return 'users'

    default:
      return 'contracts'
  }
}

export function getEntityNameFromPath(pathName: string | undefined) {
  switch(pathName) {
    case 'caldaia':
      return 'heater'

    case 'condizionatore':
      return 'airConditioner'

    case 'utenti':
      return 'user'

    default:
      return 'all'
  }
}

export function getEntityPath(entityName: string) {
  switch(entityName!) {
    case 'heater':
      return 'caldaia'

    case 'airConditioner':
      return 'condizionatore'
    
    case 'user':
      return 'utenti'

    default:
      return 'contratti'
  }
}

export const getEntityPluralName = (entityName: string) => {
  switch(entityName!) {
    case 'heater':
        return 'heaterAll'

    case 'airConditioner':
      return 'airConditionerAll'

    case 'user':
      return 'userAll'

    default:
      return ''
  }
}

export function getItemUrls(entityName: string) {
  switch(entityName!) {
    case 'heater':
      return {
        create: 'caldaia',
        list: 'caldaia/all'
      }

    case 'airConditioner':
      return {
        create: 'condizionatore',
        list: 'condizionatore/all'
      }

    case 'user':
      return {
        create: 'utenti',
        list: 'utenti/all',
      }
    
    default:
      return {
        create: "",
        list: ""
      }
  }
}