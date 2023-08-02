import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SettingsMenuComponent } from "./components/settings-menu/settings-menu.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [CommonModule, RouterModule, SettingsMenuComponent, RouterModule],
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {}
