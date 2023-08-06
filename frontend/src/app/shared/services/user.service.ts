import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, UserCreate, UserLogin } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private readonly http: HttpClient) {}

    public register(userCreate: UserCreate): Observable<User> {
        return this.http.post<User>("api/v1/users/register", userCreate);
    }

    public login(userLogin: UserLogin): Observable<User> {
        return this.http.post<User>("api/v1/users/login", userLogin);
    }

    public logout(): Observable<object> {
        return this.http.post<object>("api/v1/users/logout", {});
    }

    public get_current_user(): Observable<User> {
        return this.http.get<User>("api/v1/users/current");
    }
}