import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import {
    BehaviorSubject,
    catchError,
    filter,
    finalize,
    Observable,
    of,
    switchMap,
    tap,
} from "rxjs";

import { ConfirmationPopupComponent } from "../components/confirmation-popup/confirmation-popup.component";
import { BackendResponse, MainRoutes } from "../models/misc.model";
import { DestroyClass } from "../utils/destroyClass";

@Injectable()
export class SplitViewManagerService<T> extends DestroyClass {
    private readonly isDetailStore$ = new BehaviorSubject<boolean>(false);
    private readonly currentIdStore$ = new BehaviorSubject<number | null>(null);
    private readonly currentItemStore$ = new BehaviorSubject<T | null>(null);
    private readonly isItemLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly dialog: MatDialog
    ) {
        super();
        this.urlChecker();
    }

    private set isLoading(b: boolean) {
        this.isItemLoading$.next(b);
    }

    public get isLoading$(): Observable<boolean> {
        return this.isItemLoading$.asObservable();
    }

    public get currentId(): number | null {
        return this.currentIdStore$.value;
    }

    public get currentId$(): Observable<number | null> {
        return this.currentIdStore$.asObservable();
    }

    public get isDetail(): boolean {
        return this.isDetailStore$.value;
    }

    public get isDetail$(): Observable<boolean> {
        return this.isDetailStore$.asObservable();
    }

    public get currentItem(): T | null {
        return this.currentItemStore$.value;
    }

    public get currentItem$(): Observable<T | null> {
        return this.currentItemStore$.asObservable();
    }

    private urlChecker(): void {
        this.activatedRoute.queryParams
            .pipe(
                tap((params) => {
                    if ("id" in params) {
                        this.isDetailStore$.next(true);
                        const { id } = params;
                        this.currentIdStore$.next(id);
                    } else {
                        this.isDetailStore$.next(false);
                        this.currentIdStore$.next(null);
                        this.currentItemStore$.next(null);
                    }
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    public changeDetailState(): void {
        this.isDetailStore$.next(!this.isDetail);
        if (!this.isDetail) this.deleteQueryParams();
    }

    private deleteQueryParams(): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                id: null,
            },
            queryParamsHandling: "merge",
        });
    }

    public addParamsToRouting(id: number): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                id,
            },
            queryParamsHandling: "merge",
        });
    }

    public refreshCurrentItem$(request: Observable<T>): Observable<T | null> {
        this.isLoading = true;
        if (this.currentId !== null) {
            return request.pipe(
                tap((item) => {
                    this.currentItemStore$.next(item);
                }),
                catchError((error) => {
                    if (error.status === 404) {
                        this.changeDetailState();
                    }
                    if (error.status === 403) {
                        this.router.navigate([MainRoutes.Error]);
                    }
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading = false;
                }),
                this.untilDestroyed()
            );
        }
        this.isLoading = false;
        return of(null);
    }

    public deleteCurrentItem$(
        request: Observable<BackendResponse>,
        message?: string
    ): Observable<BackendResponse> {
        const popup = this.dialog.open(ConfirmationPopupComponent, {
            width: "30vw",
            disableClose: true,
            data:
                message ??
                "Are you sure you want to permanently remove this item",
        });

        return popup.afterClosed().pipe(
            filter((result) => result === true),
            switchMap(() =>
                request.pipe(
                    finalize(() => {
                        this.changeDetailState();
                    })
                )
            )
        );
    }
}
