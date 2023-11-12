import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-help-card",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./help-card.component.html",
    styleUrls: ["./help-card.component.scss"],
})
export class HelpCardComponent {
    @Input() public cardHeadline: string;
    @Input() public cardText: string;
    @Input() public buttonText: string;
    @Output() buttonClick = new EventEmitter<void>();

    handleButtonClick(): void {
        this.buttonClick.emit();
    }
}
