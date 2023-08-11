import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-button-container",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./button-container.component.html",
    styleUrls: ["./button-container.component.scss"],
})
export class ButtonContainerComponent {}
