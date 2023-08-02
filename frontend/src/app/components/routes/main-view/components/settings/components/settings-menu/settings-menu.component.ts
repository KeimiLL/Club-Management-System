import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { settingsMenuItems } from "./settings-menu.data";

export interface SettingsMenuItem {
    name: string;
    route: string;
}

@Component({
    selector: "app-settings-menu",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./settings-menu.component.html",
    styleUrls: ["./settings-menu.component.scss"],
})
export class SettingsMenuComponent implements OnInit {
    menuItems: SettingsMenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = settingsMenuItems; // method to filter items will be here
    }
}
