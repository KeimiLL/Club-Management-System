import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

import { RoleDefinitions, SubPermissions } from "../models/permission.model";
import { Roles } from "../models/user.model";
import { UserService } from "../services/user.service";

@Directive({
    selector: "[appPermission]",
    standalone: true,
})
export class PermissionDirective {
    constructor(
        private readonly templateRef: TemplateRef<unknown>,
        private readonly viewContainer: ViewContainerRef,
        private readonly userService: UserService
    ) {}

    @Input() set appPermission(requiredPermission: SubPermissions) {
        // const userRole = this.userService.currentUser.role
        const userRole = Roles.Admin; // for now to test

        const rolePermissions = RoleDefinitions[userRole].permissions;
        const hasPermission = rolePermissions.includes(requiredPermission);

        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
