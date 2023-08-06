import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-help",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./help.component.html",
    styleUrls: ["./help.component.scss"],
})
export class HelpComponent {}
