export async function asyncFnWrapper<T>(
  params: T, 
  fetchFn: Function
) {
  const options = await fetchFn(params)
  return options.data 
}

export function getCustomerType(
  requestedCustomerType: number, 
  contractCustomerType: Record<string, string>
) {
  return requestedCustomerType === parseInt(contractCustomerType?.value) ? true : false
}

export enum CustomerTypes {
  DOMESTIC_CUSTOMER = 1,
  BUSINESS_CUSTOMER = 2,
}

export enum AttachmentsTypeId {
  CI_FRONT_TYPE_ID = 1,
  CI_BACK_TYPE_ID = 2,
  HEALTH_INSURANCE_FRONT_TYPE_ID = 3,
  HEALTH_INSURANCE_BACK_TYPE_ID = 4,
}

export function setDefaultDate(value?: string) {
  if(value) {
    return new Date(value)
  }
  return null
}