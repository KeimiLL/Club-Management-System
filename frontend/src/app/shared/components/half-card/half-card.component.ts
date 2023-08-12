import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { MaterialModule } from "../../modules/material.module";

@Component({
    selector: "app-half-card",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./half-card.component.html",
    styleUrls: ["./half-card.component.scss"],
})
export class HalfCardComponent {
    @Input() public isRight = true;
    @Input() public name: string;
    @Input() public subName = "";
    @Output() public closedClicked = new EventEmitter<void>();

    public onClosedButtonClick(): void {
        this.closedClicked.emit();
    }
}
