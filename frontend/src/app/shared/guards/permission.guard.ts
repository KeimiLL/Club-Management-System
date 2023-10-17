import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";

import { UserService } from "../api/user.service";
import {
    RequiredPermissions,
    RoleDefinitions,
} from "../models/permission.model";

@Injectable({ providedIn: "root" })
export class PermissionGuard {
    constructor(
        private readonly router: Router,
        private readonly userService: UserService
    ) {}

    canActivate(
        next: ActivatedRoute,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (this.userService.currentUser === null) return false;

        const userRole = this.userService.currentUser.role;
        const requiredPermissions = next.data as unknown as RequiredPermissions;
        const roleDefinitions = RoleDefinitions[userRole];

        if (
            !roleDefinitions.modules.includes(
                requiredPermissions.modulesPermission
            )
        ) {
            return this.router.parseUrl("/error");
        }
        if (requiredPermissions.requiredPermission !== null) {
            if (
                !roleDefinitions.permissions.includes(
                    requiredPermissions.requiredPermission
                )
            ) {
                return this.router.parseUrl("/error");
            }
        }

        return true;
    }
}
