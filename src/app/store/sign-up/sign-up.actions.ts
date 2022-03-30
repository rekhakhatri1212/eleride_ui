
import { Action, createAction, props } from "@ngrx/store";
import { UsersVO } from "src/app/models/users-vo.model";

export enum SignUpActionTypes {
    AddUser = '[User] Add User',
    AddUserSuccess = '[User] Add User Success',
    AddUserFail = '[User] Add User Fail',

    GetUsers = '[User] Get Users',
    GetUsersSuccess = '[User] Get Users Success',
    GetUsersFail = '[User] Get Users Fail',
}

export const addUser = createAction(SignUpActionTypes.AddUser, props<{ user: UsersVO }>());
export const addUserSucess = createAction(SignUpActionTypes.AddUserSuccess, props<{ user: UsersVO }>());
export const addUserFail = createAction(SignUpActionTypes.AddUserFail);

export const getUsers = createAction(SignUpActionTypes.GetUsers);
export const getUsersSuccess = createAction(SignUpActionTypes.GetUsersSuccess, props<{ users: UsersVO[] }>());
export const getUsersFail = createAction(SignUpActionTypes.GetUsersFail, props<{error: any}>());
