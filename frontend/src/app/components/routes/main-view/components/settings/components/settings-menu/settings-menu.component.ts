import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MenuItem } from "../../../../../../..//shared/models/misc.model";
import { UserService } from "../../../../../../../shared/api/user.service";
import { LowerSnakeToUpperNormal } from "../../../../../../../shared/pipes/lower-snake-to-upper-normal.pipe";
import { filterMenuItemsByPermissions } from "../../../../../../../shared/utils/permissionFilter";
import { settingsMenuItems } from "./settings-menu.data";

@Component({
    selector: "app-settings-menu",
    standalone: true,
    imports: [CommonModule, RouterModule, LowerSnakeToUpperNormal],
    templateUrl: "./settings-menu.component.html",
    styleUrls: ["./settings-menu.component.scss"],
})
export class SettingsMenuComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(private readonly userService: UserService) {}

    ngOnInit(): void {
        if (this.userService.currentUser === null) return;
        this.menuItems = filterMenuItemsByPermissions(
            settingsMenuItems,
            this.userService.currentUser.role,
            false
        );
    }
}
