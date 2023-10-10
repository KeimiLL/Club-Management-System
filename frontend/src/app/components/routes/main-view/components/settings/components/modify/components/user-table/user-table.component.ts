import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";

import {
    Roles,
    ShortUser,
} from "../../../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { TableService } from "../../../../../../../../../shared/services/table.service";
import { SettingsRootService } from "../../../../services/settings-root.service";
import { usersColumns } from "../../meeting-table.data";

@Component({
    selector: "app-user-table",
    standalone: true,
    imports: [CommonModule, MaterialModule, CardsModule],
    templateUrl: "./user-table.component.html",
    styleUrls: ["./user-table.component.scss"],
})
export class UserTableComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() set data(data: ShortUser[]) {
        this.dataSource.data = data;
    }

    protected roles: string[];
    protected displayedColumns: string[];
    protected totalItems$: Observable<number>;
    protected itemsPerPage: number;
    protected dataSource: MatTableDataSource<ShortUser> =
        new MatTableDataSource<ShortUser>();

    constructor(
        private readonly table: TableService<ShortUser>,
        private readonly root: SettingsRootService
    ) {}

    ngOnInit(): void {
        this.roles = Object.values(Roles);
        this.itemsPerPage = this.table.capacity;
        this.totalItems$ = this.table.totalItems$;
        this.displayedColumns = usersColumns;
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.itemsPerPage = this.table.capacity;
        this.totalItems$ = this.table.totalItems$;
    }

    protected changePage(event: PageEvent): void {
        this.table.changePage(event.pageIndex);
    }

    protected setSelectedRole(id: number, role: string): void {
        this.root.changeUserRole(id, role as Roles);
    }
}
