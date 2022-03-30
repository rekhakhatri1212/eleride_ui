import { createSelector, Store } from "@ngrx/store";
import AppState from "src/app/models/app-state.model";
import { SignUpState } from "./sign-up.reducer";

const getSignUpState = (state: AppState) => state.signUp;
export const currentUserSelector = createSelector(
    getSignUpState,
    (state: SignUpState) => state.currentUser
);

export const addingUserSelector = createSelector(
    getSignUpState,
    (state: SignUpState) => state.addingUser
);