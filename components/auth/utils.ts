import { Permissions } from "../../redux/api/types"

export function canI(action: string, permissions: Permissions) {
  let actionUrl = ''
  let abilityCheck = false

  if(permissions[action]) {
    actionUrl = permissions[action].href
    abilityCheck = true
  }

  return {
    actionUrl,
    abilityCheck
  }
}

export function abilityCheck(action: string, permissions: Permissions) {
  const { abilityCheck } = canI(action, permissions)
  return abilityCheck
}