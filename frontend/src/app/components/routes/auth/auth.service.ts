import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private readonly http: HttpClient) {}

    logout(): void {
        this.http.post("api/v1/users/logout", {}).subscribe(
            () => {
                console.log("Wylogowanie sie udalo");
            },
            (error) => {
                console.error("Logout failed:", error);
            }
        );
    }
}
