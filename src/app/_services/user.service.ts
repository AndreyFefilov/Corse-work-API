import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // tslint:disable-next-line:variable-name
    me: User;
    id: number;

    constructor(private http: HttpClient) {}

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`http://localhost:5000/api/users/get-user/${id}`, httpOptions)
            .pipe(map((data: User) => new User(data)));
    }

}
