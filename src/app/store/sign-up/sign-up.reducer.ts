import { createReducer, on } from "@ngrx/store";
import { UsersVO } from "src/app/models/users-vo.model";
import { addUser, addUserFail, addUserSucess, getUsers, getUsersFail, getUsersSuccess } from "./sign-up.actions";

export interface SignUpState {
    users: UsersVO[];
    currentUser: UsersVO | null;

    loadingUsers: boolean;
    loadedUsers: boolean;
    loadingUsersError: string | any;

    addingUser: boolean;
    addedUser: boolean;
    addingUserError: string | any;
}

const initialState: SignUpState = {
    users: [],
    currentUser: null,
    loadingUsers: false,
    loadedUsers: false,
    loadingUsersError: null,

    addingUser: false,
    addedUser: false,
    addingUserError: ''
};

export const SignUpReducer = createReducer(
    initialState,
    on(addUser, (state) => ({
        ...state,
        addingUser: true
    })),
    on(addUserSucess, (state, payload) => ({
        ...state,
        addingUser: false,
        addedUser: true,
        currentUser: payload.user
    })),
    on(addUserFail, (state) => ({
        ...state,
        addingUser: false,
        addingUserError: true
    })),
    on(getUsers, (state) => ({
        ...state,
        loadingUsers: true
    })),
    on(getUsersSuccess, (state, payload) => ({
        ...state,
        loadingUsers: false,
        loadedUsers: true,
        users: payload.users
    })),
    on(getUsersFail, (state, payload) => ({
        ...state,
        loadingUsers: false,
        loadingUsersError: payload.error
    }))

);
