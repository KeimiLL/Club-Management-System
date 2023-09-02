import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MenuRootService } from "../../menu-root.service";
import { MaterialModule } from "./../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-logout",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent {
    @Input() isCollapsed = false;

    constructor(private readonly menuRoot: MenuRootService) {}

    public logout(): void {
        this.menuRoot.logout();
    }
}
