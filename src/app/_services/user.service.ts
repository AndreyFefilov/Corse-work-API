import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // tslint:disable-next-line:variable-name
    private _me: any;

    constructor(private http: HttpClient) {

    }

    get me() {
        return this._me;
    }

    set me(value: any) {
        this._me = value;
    }

    getUser(id: number): Observable<User> {
        return this.http.get(`http://localhost:5000/api/users/get-user/${id}`)
            .pipe(map((data: User) => new User(data)));
    }
}
