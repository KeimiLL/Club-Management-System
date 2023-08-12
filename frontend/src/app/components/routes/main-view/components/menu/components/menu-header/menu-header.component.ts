import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MaterialModule } from "src/app/shared/modules/material.module";

@Component({
    selector: "app-menu-header",
    templateUrl: "./menu-header.component.html",
    styleUrls: ["./menu-header.component.scss"],
    standalone: true,
    imports: [CommonModule, MaterialModule],
})
export class MenuHeaderComponent {
    @Input() public isCollapsed: boolean;
    @Output() public collapsedClicked = new EventEmitter<void>();

    public onCollapseButtonClick(): void {
        this.collapsedClicked.emit();
    }
}
