import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsModule } from "src/app/shared/modules/cards.module";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [CommonModule, CardsModule],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
})
export class MeetingsComponent {}
