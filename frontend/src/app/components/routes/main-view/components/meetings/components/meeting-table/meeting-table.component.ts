import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";

import { PermissionDirective } from "../../../../../../../shared/directives/permission.directive";
import {
    LongMeeting,
    ShortMeeting,
} from "../../../../../../../shared/models/meetings.model";
import { MeetingsPermission } from "../../../../../../../shared/models/permission.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { MeetingsRootService } from "../../services/meetings-root.service";

@Component({
    selector: "app-meeting-table",
    standalone: true,
    imports: [CommonModule, MaterialModule, MatIconModule, PermissionDirective],
    templateUrl: "./meeting-table.component.html",
    styleUrls: ["./meeting-table.component.scss"],
})
export class MeetingTableComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() set data(data: LongMeeting[] | ShortMeeting[]) {
        this.dataSource.data = data;
    }

    protected displayedColumns$: Observable<string[]>;
    protected totalItems$: Observable<number>;
    protected itemsPerPage: number;
    protected index$: Observable<number>;

    protected readonly permissions = MeetingsPermission;
    protected dataSource: MatTableDataSource<LongMeeting | ShortMeeting> =
        new MatTableDataSource<LongMeeting | ShortMeeting>();

    constructor(
        private readonly splitManager: SplitViewManagerService,
        private readonly table: TableService<LongMeeting>,
        private readonly root: MeetingsRootService
    ) {}

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
        this.splitManager.addParamsToRouting(id);
    }

    protected changePage(event: PageEvent): void {
        this.table.changePage(event.pageIndex);
    }
}
