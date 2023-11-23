import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";

import { DateComponent } from "../../../../../../../shared/components/date/date.component";
import { SpinnerComponent } from "../../../../../../../shared/components/spinner/spinner.component";
import {
    Match,
    TableMatch,
} from "../../../../../../../shared/models/match.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { ScorePipe } from "../../../../../../../shared/pipes/score.pipe";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { ScheduleRootService } from "../../services/schedule-root.service";

@Component({
    selector: "app-schedule-table",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        DateComponent,
        SpinnerComponent,
        ScorePipe,
    ],
    templateUrl: "./schedule-table.component.html",
    styleUrls: ["./schedule-table.component.scss"],
    providers: [ScheduleRootService],
})
export class ScheduleTableComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() public set data(data: TableMatch[]) {
        this.dataSource.data = data;
    }

    protected dataSource: MatTableDataSource<TableMatch> =
        new MatTableDataSource<TableMatch>();

    protected displayedColumns$: Observable<string[]>;
    protected totalItems$: Observable<number>;
    protected itemsPerPage: number;
    protected index$: Observable<number>;
    protected isTableLoading$: Observable<boolean>;
    protected spinnerMessage = "Loading meetings...";

    constructor(
        private readonly splitView: SplitViewManagerService<Match>,
        private readonly table: TableService<TableMatch>,
        private readonly root: ScheduleRootService
    ) {}

    ngOnInit(): void {
        this.itemsPerPage = this.table.capacity;
        this.index$ = this.table.currentPageIndex$;
        this.totalItems$ = this.table.totalItems$;
        this.displayedColumns$ = of(["Opponent", "Score", "Date", "Home"]);
        this.isTableLoading$ = this.table.isLoading$;
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
