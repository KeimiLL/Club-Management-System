import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MainMenuItem } from "../../../../../../../shared/models/misc.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { LowerSnakeToUpperNormal } from "../../../../../../../shared/pipes/lower-snake-to-upper-normal.pipe";

@Component({
    selector: "app-menu-item",
    templateUrl: "./menu-item.component.html",
    styleUrls: ["./menu-item.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        LowerSnakeToUpperNormal,
    ],
})
export class MenuItemComponent {
    @Input() public item: MainMenuItem;
    @Input() public isCollapsed: boolean;
}
