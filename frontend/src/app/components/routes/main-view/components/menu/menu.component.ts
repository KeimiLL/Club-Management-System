import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MainMenuItem } from "../../../../../shared/models/misc.model";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { filterMenuItemsByPermissions } from "../../../../../shared/utils/permissionFilter";
import { UserService } from "./../../../../../shared/services/user.service";
import { LogoutComponent } from "./components/logout/logout.component";
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { menuItems } from "./menu.data";
import { MenuRootService } from "./menu-root.service";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        MenuHeaderComponent,
        MenuItemComponent,
        LogoutComponent,
    ],
    providers: [MenuRootService],
})
export class MenuComponent implements OnInit {
    public isCollapsed = true;
    public menuItems: MainMenuItem[];

    constructor(private readonly userService: UserService) {}

    ngOnInit(): void {
        if (this.userService.currentUser !== null) {
            this.menuItems = filterMenuItemsByPermissions(
                menuItems,
                this.userService.currentUser.role
            );
        }
    }

    public toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
