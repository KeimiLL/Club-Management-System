import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import { FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";

import { PermissionBackgroundColorDirective } from "../../../../../../../../../shared/directives/permission-background-color.directive";
import {
    Roles,
    UserForAdmin,
} from "../../../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { TableService } from "../../../../../../../../../shared/services/table.service";
import { SettingsRootService } from "../../../../services/settings-root.service";
import { usersColumns } from "../../meeting-table.data";
import { SettingsModifyRootService } from "../../settings-modify-root.service";

@Component({
    selector: "app-user-table",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        ReactiveFormsModule,
        PermissionBackgroundColorDirective,
    ],
    templateUrl: "./user-table.component.html",
    styleUrls: ["./user-table.component.scss"],
})
export class UserTableComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() set data(data: UserForAdmin[]) {
        this.dataSource.data = data;
    }

    protected passwordFormArray: FormArray<FormControl<string>>;
    protected roles: string[];
    protected displayedColumns: string[];
    protected totalItems$: Observable<number>;
    protected itemsPerPage: number;
    protected dataSource: MatTableDataSource<UserForAdmin> =
        new MatTableDataSource<UserForAdmin>();

    constructor(
        private readonly table: TableService<UserForAdmin>,
        private readonly modifyRoot: SettingsModifyRootService,
        private readonly root: SettingsRootService
    ) {
        this.passwordFormArray = this.modifyRoot.passwordFormArray;
    }

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
        this.modifyRoot.changeUserRole(id, role as Roles);
    }

    protected changePassword(userId: number, controlId: number): void {
        this.root.changeUsersPassword(
            userId,
            this.passwordFormArray.controls[controlId].value
        );
        this.passwordFormArray.at(controlId).reset();
    }
}
