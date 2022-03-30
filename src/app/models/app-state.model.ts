import { ActionReducerMap } from "@ngrx/store";
import { SignUpReducer, SignUpState } from "../store/sign-up/sign-up.reducer";

export default class AppState {
    signUp: SignUpState
}

export const reducers: ActionReducerMap<AppState> = {
    signUp: SignUpReducer
};
