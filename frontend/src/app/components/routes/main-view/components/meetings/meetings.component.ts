import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { AutoTableComponent } from "../../../../../shared/components/auto-table/auto-table.component";
import { longMeetingsMockup } from "../../../../../shared/mock/meetings.mock";
import { ShortMeetingDataCell } from "../../../../../shared/models/meetings.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { LegendComponent } from "./components/legend/legend.component";
import { MeetingsHttpService } from "./services/meetings-http.service";
import { MeetingsRootService } from "./services/meetings-root.service";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        LegendComponent,
        AutoTableComponent,
    ],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
    providers: [
        SplitViewManagerService,
        MeetingsHttpService,
        MeetingsRootService,
    ],
})
export class MeetingsComponent implements OnInit {
    protected isDetail$: Observable<boolean>;
    protected meetingsArray = longMeetingsMockup;
    protected meetingsShortArray: ShortMeetingDataCell[];

    constructor(private readonly splitService: SplitViewManagerService) {}

    ngOnInit(): void {
        this.isDetail$ = this.splitService.isDetail$;
    }

    protected switchDetail(): void {
        this.splitService.changeDetailState();
    }
}
