import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PermissionColorDirective } from "src/app/shared/directives/permission-color.directive";
import { User } from "src/app/shared/models/user.model";
import { UserService } from "src/app/shared/services/user.service";

import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-menu-header",
    templateUrl: "./menu-header.component.html",
    styleUrls: ["./menu-header.component.scss"],
    standalone: true,
    imports: [CommonModule, MaterialModule, PermissionColorDirective],
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
