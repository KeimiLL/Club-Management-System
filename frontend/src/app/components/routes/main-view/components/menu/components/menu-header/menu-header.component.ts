import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-menu-header",
    templateUrl: "./menu-header.component.html",
    styleUrls: ["./menu-header.component.scss"],
})
export class MenuHeaderComponent {
    @Input() public isCollapsed: boolean;
    @Output() public collapsedClicked: EventEmitter<void> = new EventEmitter();

    public onCollapseButtonClick(): void {
        this.collapsedClicked.emit();
    }
}
