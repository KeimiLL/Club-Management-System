import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MenuItem } from "../../../../../../..//shared/models/misc.model";
import { UserService } from "../../../../../../../shared/api/user.service";
import { PermissionDirective } from "../../../../../../../shared/directives/permission.directive";
import { LowerSnakeToUpperNormal } from "../../../../../../../shared/pipes/lower-snake-to-upper-normal.pipe";
import { StringToSubpermissionPipe } from "../../../../../../../shared/pipes/string-to-subpermission.pipe";
import { settingsMenuItems } from "./settings-menu.data";

@Component({
    selector: "app-settings-menu",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        LowerSnakeToUpperNormal,
        PermissionDirective,
        StringToSubpermissionPipe,
    ],
    templateUrl: "./settings-menu.component.html",
    styleUrls: ["./settings-menu.component.scss"],
})
export class SettingsMenuComponent implements OnInit {
    protected menuItems: MenuItem[] = [];

    constructor(private readonly userService: UserService) {}

    ngOnInit(): void {
        if (this.userService.currentUser === null) return;
        this.menuItems = settingsMenuItems;
    }
}
