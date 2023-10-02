import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";

import { TableResponse } from "../models/misc.model";

@Injectable()
export class TableService<T> {
    public readonly capacity = 7;
    private readonly currentPageIndexStore$ = new BehaviorSubject<number>(0);
    public totalItems: number;

    public get currentPageIndex(): number {
        return this.currentPageIndexStore$.value;
    }

    public get currentPageIndex$(): Observable<number> {
        return this.currentPageIndexStore$.asObservable();
    }

    public prevPage(): void {
        if (this.currentPageIndex > 0) {
            this.currentPageIndexStore$.next(this.currentPageIndex - 1);
        }
    }

    public nextPage(): void {
        if (this.totalItems > (this.currentPageIndex + 1) * this.capacity) {
            this.currentPageIndexStore$.next(this.currentPageIndex + 1);
        }
    }

    public getCurrentPage(
        request: Observable<TableResponse<T>>
    ): Observable<T[]> {
        return request.pipe(
            tap(
                (response: TableResponse<T>) =>
                    (this.totalItems = response.total)
            ),
            map((response: TableResponse<T>) => response.items)
        );
    }
}
