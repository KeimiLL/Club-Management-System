import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material.module";

import { MenuHeaderComponent } from "./components/menu-header/menu-header.component";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { menuItems } from "./menu.data";

export interface MenuItem {
    icon: string;
    name: string;
    route: string;
}

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
    public menuItems: MenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = menuItems; // filterinng permissions here
    }

    public toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
