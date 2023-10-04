import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { DestroyClass } from "../utils/destroyClass";

@Injectable()
export class SplitViewManagerService extends DestroyClass {
    private readonly isDetailStore$ = new BehaviorSubject<boolean>(false);
    private readonly currentIdStore$ = new BehaviorSubject<number | null>(null);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        super();
        this.urlChecker();
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
                    }
                }),
                this.untilDestroyed()
            )
            .subscribe();
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
}
