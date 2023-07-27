import { Component, OnInit, ViewChild } from "@angular/core";
import { menuItems } from "./menu.data";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
    public collapsed = false;
    public menuItems: string[] = [];

    ngOnInit(): void {
        this.menuItems = menuItems; // filterinng permissions
    }

    public toggleCollapse(): void {
        this.collapsed = !this.collapsed;
    }
}
