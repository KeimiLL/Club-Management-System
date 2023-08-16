import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { MenuItem } from "../../menu.component";

@Component({
    selector: "app-menu-item",
    templateUrl: "./menu-item.component.html",
    styleUrls: ["./menu-item.component.scss"],
    standalone: true,
    imports: [CommonModule, RouterModule, MaterialModule],
})
export class MenuItemComponent {
    @Input() item: MenuItem;
    @Input() isCollapsed: boolean;
}
