import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { PermissionDirective } from "../../../../../../../shared/directives/permission.directive";
import {
    LongMeeting,
    ShortMeeting,
} from "../../../../../../../shared/models/meetings.model";
import { MeetingsPermission } from "../../../../../../../shared/models/permission.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { longMeetingColumns, shortMeetingColumns } from "./meeting-table.data";

@Component({
    selector: "app-meeting-table",
    standalone: true,
    imports: [CommonModule, MaterialModule, MatIconModule, PermissionDirective],
    templateUrl: "./meeting-table.component.html",
    styleUrls: ["./meeting-table.component.scss"],
})
export class MeetingTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    protected dataSource: MatTableDataSource<LongMeeting | ShortMeeting> =
        new MatTableDataSource<LongMeeting | ShortMeeting>();

    @Input() set data(data: LongMeeting[] | ShortMeeting[]) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
    }

    protected displayedColumns: string[] = [];

    protected readonly permissions = MeetingsPermission;

    constructor(private readonly splitManager: SplitViewManagerService) {}

    ngOnInit(): void {
        this.displayedColumns = this.splitManager.isDetail
            ? shortMeetingColumns
            : longMeetingColumns;
    }

    protected addParamsToURL(id: number): void {
        this.splitManager.addParamsToRouting(id);
    }
}
