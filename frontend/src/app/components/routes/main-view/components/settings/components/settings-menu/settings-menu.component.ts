import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { settingsMenuItems } from "./settings-menu.data";
import { RouterModule } from "@angular/router";
import { SettingsMenuItem } from "src/app/shared/models/settings.models";

@Component({
    selector: "app-settings-menu",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./settings-menu.component.html",
    styleUrls: ["./settings-menu.component.scss"],
})
export class SettingsMenuComponent implements OnInit {
    menuItems: SettingsMenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = settingsMenuItems; // method to filter items will be here
    }
}
