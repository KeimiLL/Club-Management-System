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
import { Roles } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class PermissionGuard {
    constructor(private readonly router: Router) {}

    canActivate(
        next: ActivatedRoute,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        // const userRole = this.userService.currentUser.role
        // const requiredPermissions = next.data;
        const requiredPermissions = next.data as unknown as RequiredPermissions;
        const userRole = Roles.Coach; // for now to test
        const roleDefinitions = RoleDefinitions[userRole];

        if (
            !roleDefinitions.modules.includes(
                requiredPermissions.modulesPermission
            )
        ) {
            return this.router.parseUrl("/auth"); // then 404 page
        }
        if (
            requiredPermissions.requiredPermission !== null &&
            !roleDefinitions.permissions.includes(
                requiredPermissions.requiredPermission
            )
        ) {
            return this.router.parseUrl("/auth"); // then 404 page
        }

        return true;
    }
}
