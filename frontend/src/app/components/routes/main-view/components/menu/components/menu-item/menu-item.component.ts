import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MainMenuItem } from "../../../../../../../shared/models/misc.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { MenuItemPipe } from "../../../../../../../shared/pipes/menu-item.pipe";

@Component({
    selector: "app-menu-item",
    templateUrl: "./menu-item.component.html",
    styleUrls: ["./menu-item.component.scss"],
    standalone: true,
    imports: [CommonModule, RouterModule, MaterialModule, MenuItemPipe],
})
export class MenuItemComponent {
    @Input() item: MainMenuItem;
    @Input() isCollapsed: boolean;
}
