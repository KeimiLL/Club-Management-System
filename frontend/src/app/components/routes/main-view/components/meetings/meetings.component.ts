import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
})
export class MeetingsComponent {
    public isDetail = false;

    public changeState(): void {
        this.isDetail = !this.isDetail;
    }
}
