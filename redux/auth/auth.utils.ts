import { FirebaseErrorMessagesIt } from "../../firebase"
import { fetchData, getAPIUrl } from "../api/utils"

export function ccLogin(accessToken: string) {
  return fetchData(`${getAPIUrl()}/login`, accessToken)
    .then(response => response)
}

export function checkUserPassword(email: string) {
  return fetchData(`${getAPIUrl()}/users/must-change-pwd?username=${email}`)
    .then(response => response.data)
}

export const translateFirebaseErrorMessage = 
  (error: Error) => {
    if(error.message) {
      return {
        status: 400,
        data: FirebaseErrorMessagesIt[error.message as keyof typeof FirebaseErrorMessagesIt]
      }
    }

    return {
      status: 400,
      data: "Si è verificato un problema!"
    }
  }