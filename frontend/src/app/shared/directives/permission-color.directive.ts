import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { Roles } from "../models/user.model";
import { UserService } from "../services/user.service";

export const RoleColorsMapping: Record<Roles, string> = {
    [Roles.Admin]: "#ef436b",
    [Roles.Coach]: "#26547d",
    [Roles.Player]: "#ffce5c",
    [Roles.Viewer]: "#b4befe",
    [Roles.Medic]: "#ffb056",
    [Roles.Board]: "#06d6a0",
};

@Directive({
    selector: "[appPermissionColor]",
    standalone: true,
})
export class PermissionColorDirective implements OnInit {
    @Input() propToChange: "background" | "color" = "background";

    constructor(
        private readonly elementRef: ElementRef,
        private readonly userService: UserService
    ) {}

    ngOnInit(): void {
        const color =
            RoleColorsMapping[
                this.userService.currentUser?.role ?? Roles.Viewer
            ];

        if (this.propToChange === "background") {
            this.changeBackgroundcolor(color);
        } else this.changeColor(color);
    }

    private changeBackgroundcolor(color: string): void {
        this.elementRef.nativeElement.style.backgroundColor = color;
    }

    private changeColor(color: string): void {
        this.elementRef.nativeElement.style.color = color;
    }
}
