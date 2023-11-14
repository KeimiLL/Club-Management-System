import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-score",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.scss"],
})
export class ScoreComponent {}
