import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { MaterialModule } from "../../modules/material.module";

@Component({
    selector: "app-auto-table",
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule],
    templateUrl: "./auto-table.component.html",
    styleUrls: ["./auto-table.component.scss"],
})
export class AutoTableComponent<T> implements AfterViewInit {
    protected dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
    protected displayedColumns: string[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    @Input() set data(data: T[]) {
        this.dataSource.data = data;
        if (data.length > 0) {
            this.displayedColumns = Object.keys(data[0] as object).filter(
                (column) => column !== "id"
            );
        } else {
            this.displayedColumns = [];
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    protected addParamsToRouting(id: number): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                id,
            },
            queryParamsHandling: "merge",
        });
    }
}
