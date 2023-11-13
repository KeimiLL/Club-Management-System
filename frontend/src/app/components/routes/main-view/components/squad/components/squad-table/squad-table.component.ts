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
import { Observable, of } from "rxjs";

import { DateComponent } from "../../../../../../../shared/components/date/date.component";
import { SpinnerComponent } from "../../../../../../../shared/components/spinner/spinner.component";
import {
    Player,
    TablePlayer,
} from "../../../../../../../shared/models/player.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../../shared/services/table.service";
import { SquadRootService } from "../../services/squad-root.service";
import { longPlayerColumns } from "../../squad-table.data";

@Component({
    selector: "app-squad-table[isUserPlayer]",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        MatIconModule,
        DateComponent,
        SpinnerComponent,
    ],
    templateUrl: "./squad-table.component.html",
    styleUrls: ["./squad-table.component.scss"],
})
export class SquadTableComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() public set data(data: TablePlayer[]) {
        this.dataSource.data = data;
    }

    @Input() public isUserPlayer: boolean;

    protected dataSource: MatTableDataSource<TablePlayer> =
        new MatTableDataSource<TablePlayer>();

    protected displayedColumns$: Observable<string[]> = of(longPlayerColumns);
    protected totalItems$: Observable<number>;
    protected itemsPerPage: number;
    protected index$: Observable<number>;
    protected isPlayersLoading$: Observable<boolean>;

    constructor(
        private readonly splitView: SplitViewManagerService<Player>,
        private readonly table: TableService<TablePlayer>,
        private readonly root: SquadRootService
    ) {}

    ngOnInit(): void {
        this.itemsPerPage = this.table.capacity;
        this.index$ = this.table.currentPageIndex$;
        this.totalItems$ = this.table.totalItems$;
        this.displayedColumns$ = this.root.displayedColumns$;
        this.isPlayersLoading$ = this.table.isLoading$;
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.itemsPerPage = this.table.capacity;
        this.totalItems$ = this.table.totalItems$;
    }

    protected addParamsToURL(id: number): void {
        if (!this.isUserPlayer) this.splitView.addParamsToRouting(id);
    }

    protected changePage(event: PageEvent): void {
        this.table.changePage(event.pageIndex);
    }
}
