enum InactiveToastifyEndpoints {
  login,
  logOut,
}

export function isActiveToastifyEndpoint(action: any) {
  const type = action.meta ? action.meta.arg?.type : undefined
  const endpointName = action.meta ? action.meta.arg?.endpointName : undefined
  
  if(
    type === "mutation" &&
    !(endpointName in InactiveToastifyEndpoints)
  ) {
    return true
  }

  return false
}