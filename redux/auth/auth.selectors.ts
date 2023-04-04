import { createDraftSafeSelector } from "@reduxjs/toolkit"

import { RootState } from "../store"

export const selectAuth = (state: RootState) => state.auth

export const selectCurrentUser = createDraftSafeSelector(
  [selectAuth],
  auth => auth.currentUser
)

export const selectCurrentUserPermissions = createDraftSafeSelector(
  [selectAuth],
  auth => auth.currentUser?.links ?? {}
)