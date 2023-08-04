import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../modules/material.module";

@Component({
    selector: "app-wide-main-card",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./wide-main-card.component.html",
    styleUrls: ["./wide-main-card.component.scss"],
})
export class WideMainCardComponent {
    @Input() public name: string;
    @Input() public subName = "";
}
