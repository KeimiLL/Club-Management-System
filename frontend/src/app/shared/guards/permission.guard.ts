import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";

import {
    RequiredPermissions,
    RoleDefinitions,
} from "../models/permission.model";
import { UserService } from "../services/user.service";

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
