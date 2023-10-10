import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendResponse } from "../models/misc.model";
import {
    Roles,
    ShortUser,
    User,
    UserCreate,
    UserLogin,
} from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    public currentUser: User | null = null;

    constructor(private readonly http: HttpClient) {}

    public register(userCreate: UserCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>(
            "api/v1/users/register",
            userCreate
        );
    }

    public login(userLogin: UserLogin): Observable<User> {
        return this.http.post<User>("api/v1/users/login", userLogin);
    }

    public logout(): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("api/v1/users/logout", {});
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>("api/v1/users/current");
    }

    public getAllUsers(): Observable<ShortUser[]> {
        return this.http.get<ShortUser[]>("api/v1/users/filtered");
    }

    public updateRole(
        userId: number,
        role: Roles
    ): Observable<BackendResponse> {
        return this.http.put<BackendResponse>(
            `api/v1/users/${userId}/role?role=${role}`,
            {}
        );
    }
}
