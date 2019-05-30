import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // tslint:disable-next-line:variable-name
    private _me: any;

    get me() {
        return this._me;
    }

    set me(value: any) {
        this._me = value;
    }
}
