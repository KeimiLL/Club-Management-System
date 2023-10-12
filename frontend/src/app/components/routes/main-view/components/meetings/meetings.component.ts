import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import {
    Meeting,
    TableMeeting,
} from "../../../../../shared/models/meetings.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../shared/services/table.service";
import { CurrentMeetingContentComponent } from "./components/current-meeting-content/current-meeting-content.component";
import { LegendComponent } from "./components/legend/legend.component";
import { MeetingTableComponent } from "./components/meeting-table/meeting-table.component";
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
        MeetingTableComponent,
        CurrentMeetingContentComponent,
    ],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
    providers: [
        SplitViewManagerService,
        MeetingsHttpService,
        MeetingsRootService,
        TableService,
    ],
})
export class MeetingsComponent implements OnInit {
    protected isDetail$: Observable<boolean>;
    protected tableMeetings$: Observable<TableMeeting[]>;
    protected currentMeeting$: Observable<Meeting | null>;

    constructor(
        private readonly splitView: SplitViewManagerService<Meeting>,
        private readonly root: MeetingsRootService,
        private readonly table: TableService<TableMeeting>
    ) {}

    ngOnInit(): void {
        this.isDetail$ = this.splitView.isDetail$;
        this.tableMeetings$ = this.table.tableItems$;
        this.currentMeeting$ = this.splitView.currentItem$;
    }

    protected switchDetail(): void {
        this.splitView.changeDetailState();
    }

    protected onNewMeetingClick(): void {
        this.root.openNewMeetingDialog();
    }

    protected onModifyMeetingClick(): void {
        this.root.openEditMeetingDialog();
    }
}
