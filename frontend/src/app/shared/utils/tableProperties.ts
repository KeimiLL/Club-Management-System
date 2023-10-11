import { Injectable, Input, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";

@Injectable()
export class TableProperties<T> {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() set data(data: T[]) {
        this.dataSource.data = data;
    }

    protected dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
    protected totalItems$: Observable<number>;
    protected index$: Observable<number>;
    protected itemsPerPage: number;
}
