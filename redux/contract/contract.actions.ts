import { createAction } from "@reduxjs/toolkit";

export const resetContract = createAction("RESET_CONTRACT")
export const setEntityName = createAction<string>("SET_ENTITY_NAME")
export const changeSelectedStep = createAction<number>("CHANGE_SELECTED_STEP")