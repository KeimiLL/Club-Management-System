import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

import { UserService } from "../api/user.service";
import { Roles } from "../models/user.model";

@Directive({
    selector: "[appRole]",
    standalone: true,
})
export class RoleDirective {
    constructor(
        private readonly templateRef: TemplateRef<unknown>,
        private readonly viewContainer: ViewContainerRef,
        private readonly userService: UserService
    ) {}

    @Input() public set appRole(requiredRole: Roles) {
        if (this.userService.currentUser === null) return;

        const userRole = this.userService.currentUser.role;

        if (userRole === requiredRole) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
