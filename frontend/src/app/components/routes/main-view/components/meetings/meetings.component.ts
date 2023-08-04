import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
})
export class MeetingsComponent {}
