import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MenuItem } from "../../../../../../..//shared/models/misc.model";
import { MenuItemPipe } from "../../../../../../..//shared/pipes/menu-item.pipe";
import { filterMenuItemsByPermissions } from "../../../../../../../shared/utils/permissionFilter";
import { settingsMenuItems } from "./settings-menu.data";

@Component({
    selector: "app-settings-menu",
    standalone: true,
    imports: [CommonModule, RouterModule, MenuItemPipe],
    templateUrl: "./settings-menu.component.html",
    styleUrls: ["./settings-menu.component.scss"],
})
export class SettingsMenuComponent implements OnInit {
    menuItems: MenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = filterMenuItemsByPermissions(settingsMenuItems, false); // method to filter items will be here
    }
}
