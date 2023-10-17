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
import { Observable } from "rxjs";

import { TableTeam, Team } from "../../../../../../../shared/models/team.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { teamsColumns } from "../../teams-table.data";

@Component({
    selector: "app-teams-table",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./teams-table.component.html",
    styleUrls: ["./teams-table.component.scss"],
})
export class TeamsTableComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() public set data(data: TableTeam[]) {
        this.dataSource.data = data;
    }

    protected dataSource: MatTableDataSource<TableTeam> =
        new MatTableDataSource<TableTeam>();

    protected displayedColumns: string[];
    protected totalItems$: Observable<number>;
    protected itemsPerPage: number;
    protected index$: Observable<number>;
    constructor(
        private readonly splitView: SplitViewManagerService<Team>,
        private readonly table: TableService<TableTeam>
    ) {}

    ngOnInit(): void {
        this.displayedColumns = teamsColumns;
        this.itemsPerPage = this.table.capacity;
        this.index$ = this.table.currentPageIndex$;
        this.totalItems$ = this.table.totalItems$;
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
