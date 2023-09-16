import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { RoleColorsMapping } from "../models/permission.model";
import { Roles } from "../models/user.model";
import { UserService } from "../services/user.service";

@Directive({
    selector: "[appPermissionColor]",
    standalone: true,
})
export class PermissionColorDirective implements OnInit {
    @Input() public appPermissionColor?: Roles;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly userService: UserService
    ) {}

    ngOnInit(): void {
        const selectedRole =
            this.appPermissionColor ??
            this.userService.currentUser?.role ??
            Roles.Viewer;

        const color = RoleColorsMapping[selectedRole];
        this.changeColor(color);
    }

    private changeColor(color: string): void {
        this.elementRef.nativeElement.style.color = color;
    }
}
