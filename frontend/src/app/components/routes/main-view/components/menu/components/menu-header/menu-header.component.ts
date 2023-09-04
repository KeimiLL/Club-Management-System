import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { PermissionBackgroundColorDirective } from "./../../../../../../../shared/directives/permission-background-color.directive";
import { User } from "./../../../../../../../shared/models/user.model";
import { MenuItemPipe } from "./../../../../../../../shared/pipes/menu-item.pipe";
import { UserService } from "./../../../../../../../shared/services/user.service";

@Component({
    selector: "app-menu-header",
    templateUrl: "./menu-header.component.html",
    styleUrls: ["./menu-header.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PermissionBackgroundColorDirective,
        MenuItemPipe,
    ],
})
export class MenuHeaderComponent implements OnInit {
    public user: User;
    @Input() public isCollapsed: boolean;
    @Output() public collapsedClicked = new EventEmitter<void>();

    constructor(private readonly userService: UserService) {}

    ngOnInit(): void {
        if (this.userService.currentUser !== null) {
            this.user = this.userService.currentUser;
        }
    }

    public onCollapseButtonClick(): void {
        this.collapsedClicked.emit();
    }
}
