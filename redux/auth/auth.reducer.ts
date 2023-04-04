import { IconName } from "@fortawesome/fontawesome-svg-core"
import { createReducer } from "@reduxjs/toolkit"

import { authApi } from "./auth.api"
import { Permissions } from "../api/types"

export type CurrentUser = {
  code: string
  email: string
  id: string
  insertData: Date
  links: Permissions
  name: string
  role: string
}

export type Entity = {
  contractCode: string
  type: string
  entityName: string
  name: string
  description: string
  icon: IconName
  active: boolean
  category: "newCustomer" | "ongoingCustomer"
  position: number
  inEvidenceUntil?: Date
}

export type AuthState = {
  currentUser: CurrentUser | null
  entities: Entity[] | null
  error: { [key: string]: any } | null
  utilityModal: {
    visibility: boolean
    modalTitle: string
    modalDescription: string
    modalIcon: string
  }
}

const INITIAL_STATE: AuthState = {
  currentUser: null,
  entities: null,
  error: null,
  utilityModal: {
    visibility: false,
    modalTitle: '',
    modalDescription: '',
    modalIcon: ''
  }
}

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      if(action.payload) {
        state.currentUser = action.payload
      }
    })
    .addMatcher(authApi.endpoints.logOut.matchFulfilled, (state, action) => {
      return {
        ...INITIAL_STATE,
      }
    })
})

export default authReducer