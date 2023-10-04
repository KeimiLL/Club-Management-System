import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";

import { TableResponse } from "../models/misc.model";

@Injectable()
export class TableService<T> {
    public readonly capacity = 7;
    private readonly currentPageIndexStore$ = new BehaviorSubject<number>(0);
    private readonly totalItemsStore$ = new BehaviorSubject<number>(0);

    public get currentPageIndex(): number {
        return this.currentPageIndexStore$.value;
    }

    public get currentPageIndex$(): Observable<number> {
        return this.currentPageIndexStore$.asObservable();
    }

    public set totalItems(totalItems: number) {
        this.totalItemsStore$.next(totalItems);
    }

    public get totalItems$(): Observable<number> {
        return this.totalItemsStore$.asObservable();
    }

    public changePage(newPage: number): void {
        this.currentPageIndexStore$.next(newPage);
    }

    public getCurrentPage(
        request: Observable<TableResponse<T>>
    ): Observable<T[]> {
        return request.pipe(
            tap((response) => {
                this.totalItems = response.total;
            }),
            map((response) => response.items)
        );
    }
}
