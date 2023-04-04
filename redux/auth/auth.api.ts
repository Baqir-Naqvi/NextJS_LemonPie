import { signInWithEmailAndPassword } from "firebase/auth"

import { auth, userSignOut, loginArgs } from "../../firebase"
import { api } from "../api"
import { ccLogin, translateFirebaseErrorMessage } from "./auth.utils"

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.query({
      async queryFn() {
        try {
          const { user } = await signInWithEmailAndPassword(auth, loginArgs.email, loginArgs.password)
          const accessToken = await user.getIdToken()
          const ccUser = await ccLogin(accessToken)
          const currentUser = {
            ...ccUser
          }
          return { data: { ...currentUser } }
        }
        catch(err) {
          const message = translateFirebaseErrorMessage(err as Error)
          return { error: message }
        }
      }
    }),
    logOut: build.mutation({
      async queryFn() {
        await userSignOut()
        return { data: null }
      }
    })
  })
})

export const {
  useLoginQuery,
  useLogOutMutation
} = authApi