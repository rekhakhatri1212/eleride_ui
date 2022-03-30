import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersVO } from 'src/app/models/users-vo.model';
import { Observable, of } from 'rxjs';
import { baseUrl } from 'src/app/models/constants';
import * as data from './users.json';
import * as currentUser from './current-user.json';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor(private httpClient: HttpClient) { }

    addUser(user: UsersVO): Observable<UsersVO> {
        return of(currentUser);
        // return this.httpClient.post<UsersVO>(`${baseUrl}/registration`, user);
    }

    getUsers(): Observable<UsersVO[]> {
        return of(data);
        // return this.httpClient.get<UsersVO[]>('users.json');
        // return this.httpClient.get<UsersVO[]>(`${baseUrl}/getAllUsers`);
    }
}
