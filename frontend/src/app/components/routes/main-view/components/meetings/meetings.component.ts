import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { LegendComponent } from "./components/legend/legend.component";
import { MeetingsHttpService } from "./services/meetings-http.service";
import { MeetingsRootService } from "./services/meetings-root.service";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, LegendComponent],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
    providers: [
        SplitViewManagerService,
        MeetingsHttpService,
        MeetingsRootService,
    ],
})
export class MeetingsComponent {
    public isDetail = false;

    public changeState(): void {
        this.isDetail = !this.isDetail;
    }
}
