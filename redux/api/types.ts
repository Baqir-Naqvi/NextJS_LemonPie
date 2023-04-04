export type ResponseType = {
  data: Record<string, unknown>
}

export type ContractMutationResponseType = {
  id: string
}

export type Permissions = {
  [key: string]: {
    href: string
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
    rel: string
  }
}

export type ApiError = {
  error: {
    message: string
    code: number
    stack: string[]
  }
}