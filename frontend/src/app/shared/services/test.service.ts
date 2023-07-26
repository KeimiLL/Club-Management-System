import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserCreate } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class TestService {
    constructor(private readonly http: HttpClient) {}

    public register(user: UserCreate) {
        return this.http.post("api/v1/users/register", user);
    }
}
