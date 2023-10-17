import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { UserService } from "../api/user.service";
import { RoleColorsMapping } from "../models/permission.model";
import { Roles } from "../models/user.model";

@Directive({
    selector: "[appPermissionBackgroundColor]",
    standalone: true,
})
export class PermissionBackgroundColorDirective implements OnInit {
    @Input() public appPermissionBackgroundColor?: Roles;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly userService: UserService
    ) {}

    ngOnInit(): void {
        const selectedRole =
            this.appPermissionBackgroundColor ??
            this.userService.currentUser?.role ??
            Roles.Viewer;

        const color = RoleColorsMapping[selectedRole];
        this.changeBackgroundcolor(color);
    }

    private changeBackgroundcolor(color: string): void {
        this.elementRef.nativeElement.style.backgroundColor = color;
    }
}
