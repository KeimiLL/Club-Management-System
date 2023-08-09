// import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
// import { Roles } from "../models/user.model";
// import { UserService } from "../services/user.service";
// import { Permission } from "../models/permission.model";

// @Directive({
//     selector: "[appPermission]",
//     standalone: true,
// })
// export class PermissionDirective {
//     constructor(
//         private templateRef: TemplateRef<unknown>,
//         private viewContainer: ViewContainerRef,
//         private readonly userService: UserService
//     ) {}

//     @Input() set appPermission(requiredPermission: Roles[]) {
//         // const userRole = this.userService.get_current_user.role
//         const userRole = Roles.Admin;

//         if (requiredPermission.includes(userRole)) {
//             this.viewContainer.createEmbeddedView(this.templateRef);
//         } else {
//             this.viewContainer.clear();
//         }
//     }
// }
