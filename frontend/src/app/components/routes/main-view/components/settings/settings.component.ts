import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TableService } from "../../../../../shared/services/table.service";
import { SettingsMenuComponent } from "./components/settings-menu/settings-menu.component";
import { SettingsRootService } from "./services/settings-root.service";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [CommonModule, RouterModule, SettingsMenuComponent],
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
    providers: [SettingsRootService, TableService],
})
export class SettingsComponent {}
