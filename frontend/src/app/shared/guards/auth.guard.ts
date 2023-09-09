import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";

import { MainRoutes } from "../models/misc.model";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: "root" })
export class AuthGuard {
    constructor(
        private readonly router: Router,
        private readonly userService: UserService
    ) {}

    canActivate(
        next: ActivatedRoute,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (next.routeConfig?.path === MainRoutes.Error) {
            if (this.userService.currentUser !== null) return true;
            return this.router.parseUrl("/auth/login");
        }
        if (next.routeConfig?.path === MainRoutes.Auth) {
            if (this.userService.currentUser === null) return true;
            return this.router.parseUrl("/app/dashboard");
        }
        if (this.userService.currentUser !== null) return true;
        return this.router.parseUrl("/auth/login");
    }
}
