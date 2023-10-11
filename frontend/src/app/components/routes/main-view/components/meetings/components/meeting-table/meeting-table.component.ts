import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { PageEvent } from "@angular/material/paginator";
import { Observable } from "rxjs";

import { PermissionDirective } from "../../../../../../../shared/directives/permission.directive";
import {
    Meeting,
    TableMeeting,
} from "../../../../../../../shared/models/meetings.model";
import { MeetingsPermission } from "../../../../../../../shared/models/permission.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { TableProperties } from "../../../../../../../shared/utils/tableProperties";
import { MeetingsRootService } from "../../services/meetings-root.service";

@Component({
    selector: "app-meeting-table",
    standalone: true,
    imports: [CommonModule, MaterialModule, MatIconModule, PermissionDirective],
    templateUrl: "./meeting-table.component.html",
    styleUrls: ["./meeting-table.component.scss"],
})
export class MeetingTableComponent
    extends TableProperties<TableMeeting>
    implements OnInit, AfterViewInit
{
    protected displayedColumns$: Observable<string[]>;
    protected readonly permissions = MeetingsPermission;

    constructor(
        private readonly splitView: SplitViewManagerService<Meeting>,
        private readonly table: TableService<TableMeeting>,
        private readonly root: MeetingsRootService
    ) {
        super();
    }

    ngOnInit(): void {
        this.itemsPerPage = this.table.capacity;
        this.index$ = this.table.currentPageIndex$;
        this.totalItems$ = this.table.totalItems$;
        this.displayedColumns$ = this.root.displayedColumns$;
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.itemsPerPage = this.table.capacity;
        this.totalItems$ = this.table.totalItems$;
    }

    protected addParamsToURL(id: number): void {
        this.splitView.addParamsToRouting(id);
    }

    protected changePage(event: PageEvent): void {
        this.table.changePage(event.pageIndex);
    }
}
