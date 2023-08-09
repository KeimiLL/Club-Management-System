import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { Roles } from "../models/user.model";
import { UserService } from "../services/user.service";
import { RoleDefinitions, SubPermissions } from "../models/permission.model";

@Directive({
    selector: "[appPermission]",
    standalone: true,
})
export class PermissionDirective {
    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        private readonly userService: UserService
    ) {}

    @Input() set appPermission(requiredPermission: SubPermissions) {
        // const userRole = this.userService.currentUser.role
        const userRole = Roles.Admin; //for now to test

        const rolePermissions = RoleDefinitions[userRole].permissions;
        const hasPermission = rolePermissions.includes(requiredPermission);

        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
