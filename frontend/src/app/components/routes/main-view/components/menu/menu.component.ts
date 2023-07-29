import { Component, OnInit } from "@angular/core";
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
