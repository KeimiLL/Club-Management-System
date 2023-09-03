import { Directive, ElementRef, OnInit } from "@angular/core";

import { RoleColorsMapping } from "../models/permission.model";
import { Roles } from "../models/user.model";
import { UserService } from "../services/user.service";

@Directive({
    selector: "[appPermissionBackgroundColor]",
    standalone: true,
})
export class PermissionBackgroundColorDirective implements OnInit {
    constructor(
        private readonly elementRef: ElementRef,
        private readonly userService: UserService
    ) {}

    ngOnInit(): void {
        const color =
            RoleColorsMapping[
                this.userService.currentUser?.role ?? Roles.Viewer
            ];
        this.changeBackgroundcolor(color);
    }

    private changeBackgroundcolor(color: string): void {
        this.elementRef.nativeElement.style.backgroundColor = color;
    }
}
