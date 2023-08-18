import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { CardsModule } from "../../../../../shared/modules/cards.module";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [CommonModule, CardsModule, MatButtonModule],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
})
export class MeetingsComponent {
    public isDetail = false;

    public changeState(): void {
        this.isDetail = !this.isDetail;
    }
}
