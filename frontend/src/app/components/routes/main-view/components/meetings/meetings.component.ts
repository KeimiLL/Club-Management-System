import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { PermissionDirective } from "../../../../../shared/directives/permission.directive";
import {
    Meeting,
    TableMeeting,
} from "../../../../../shared/models/meeting.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../shared/services/table.service";
import { CurrentMeetingContentComponent } from "./components/current-meeting-content/current-meeting-content.component";
import { MeetingTableComponent } from "./components/meeting-table/meeting-table.component";
import { MeetingsRootService } from "./services/meetings-root.service";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        MeetingTableComponent,
        CurrentMeetingContentComponent,
        PermissionDirective,
    ],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
    providers: [SplitViewManagerService, MeetingsRootService, TableService],
})
export class MeetingsComponent implements OnInit {
    protected isDetail$: Observable<boolean>;
    protected tableMeetings$: Observable<TableMeeting[]>;
    protected currentMeeting$: Observable<Meeting | null>;
    protected isCurrentMeetingLoading$: Observable<boolean>;
    protected isTableLoading$: Observable<boolean>;

    constructor(
        private readonly splitView: SplitViewManagerService<Meeting>,
        private readonly root: MeetingsRootService,
        private readonly table: TableService<TableMeeting>
    ) {}

    ngOnInit(): void {
        this.isDetail$ = this.splitView.isDetail$;
        this.tableMeetings$ = this.table.tableItems$;
        this.currentMeeting$ = this.splitView.currentItem$;
        this.isCurrentMeetingLoading$ = this.splitView.isLoading$;
        this.isTableLoading$ = this.table.isLoading$;
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

    protected onMeetingDelete(): void {
        this.root.deleteCurrentMeeting();
    }
}
