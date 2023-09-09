import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { LegendComponent } from "./components/legend/legend.component";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, LegendComponent],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
})
export class MeetingsComponent {
    public isDetail = false;

    public changeState(): void {
        this.isDetail = !this.isDetail;
    }
}
