import { Component, Input } from "@angular/core";
import { MenuItem } from "../../menu.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material.module";

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
