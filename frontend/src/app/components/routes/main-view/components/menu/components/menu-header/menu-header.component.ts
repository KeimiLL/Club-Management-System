import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { UserService } from "../../../../../../../shared/api/user.service";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { LowerSnakeToUpperNormal } from "../../../../../../../shared/pipes/lower-snake-to-upper-normal.pipe";
import { PermissionBackgroundColorDirective } from "./../../../../../../../shared/directives/permission-background-color.directive";
import { User } from "./../../../../../../../shared/models/user.model";

@Component({
    selector: "app-menu-header",
    templateUrl: "./menu-header.component.html",
    styleUrls: ["./menu-header.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PermissionBackgroundColorDirective,
        LowerSnakeToUpperNormal,
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
