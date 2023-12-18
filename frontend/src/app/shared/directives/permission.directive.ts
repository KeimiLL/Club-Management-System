import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

import { UserService } from "../api/user.service";
import { RoleDefinitions, SubPermissions } from "../models/permission.model";

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

    @Input() public set appPermission(
        requiredPermission: SubPermissions | null
    ) {
        if (this.userService.currentUser === null) return;

        if (requiredPermission === null) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
        }

        const userRole = this.userService.currentUser.role;
        const rolePermissions = RoleDefinitions[userRole].permissions;
        const hasPermission = rolePermissions.includes(requiredPermission);

        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
