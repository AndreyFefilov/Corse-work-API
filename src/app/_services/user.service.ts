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
    me: User;

    constructor(private http: HttpClient) {}

    getUser(id: number): Observable<User> {
        return this.http.get(`http://localhost:5000/api/users/get-user/${id}`)
            .pipe(map((data: User) => new User(data)));
    }

}
