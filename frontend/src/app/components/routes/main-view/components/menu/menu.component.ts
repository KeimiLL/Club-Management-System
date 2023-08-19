import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MainMenuItem } from "../../../../../shared/models/misc.model";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { filterMenuItemsByPermissions } from "../../../../../shared/utils/permissionFilter";
import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { menuItems } from "./menu.data";

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
    ],
})
export class MenuComponent implements OnInit {
    public isCollapsed = true;
    public menuItems: MainMenuItem[];

    ngOnInit(): void {
        this.menuItems = filterMenuItemsByPermissions(menuItems); // filterinng permissions here
    }

    public toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
