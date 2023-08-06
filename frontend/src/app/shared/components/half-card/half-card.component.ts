import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
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
    @Output() public closedClicked: EventEmitter<void> = new EventEmitter();

    public onClosedButtonClick(): void {
        this.closedClicked.emit();
    }
}
