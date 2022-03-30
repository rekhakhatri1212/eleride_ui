import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, of, map, exhaustMap } from "rxjs";
import { UsersVO } from "src/app/models/users-vo.model";
import { addUser, addUserFail, addUserSucess, getUsers, getUsersFail, getUsersSuccess } from "./sign-up.actions";
import { SignUpService } from "./sign-up.service";

@Injectable()
export class SignUpEffects {

    constructor(private actions$: Actions, private signUpService: SignUpService) { }

    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(addUser),
        map(payload => payload.user),
        mergeMap((payload) => this.signUpService.addUser(payload)
            .pipe(map((data: UsersVO) => {
                return addUserSucess({ user: data })
            }),
                catchError(() => of(addUserFail())))
        )
    ));

    getUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUsers),
            exhaustMap(() => this.signUpService.getUsers()
                .pipe(map((users: UsersVO[]) => {
                    return getUsersSuccess({ users })
                }),
                    catchError(error => of(getUsersFail(error)))
                )
            )
        );
    });
}
