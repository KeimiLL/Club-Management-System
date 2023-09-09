import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-legend",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./legend.component.html",
    styleUrls: ["./legend.component.scss"],
})
export class LegendComponent {}
