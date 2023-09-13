import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable()
export class SplitViewManagerService {
    private readonly isDetailStore$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        this.urlChecker();
    }

    private urlChecker(): void {
        this.activatedRoute.queryParams
            .pipe(
                tap((params) => {
                    if ("id" in params) {
                        this.isDetailStore$.next(true);
                    } else {
                        this.isDetailStore$.next(false);
                    }
                })
            )
            .subscribe();
    }

    public changeDetailState(): void {
        this.isDetailStore$.next(!this.isDetail);
        if (!this.isDetail) this.deleteQueryParams();
    }

    public get isDetail(): boolean {
        return this.isDetailStore$.value;
    }

    public get isDetail$(): Observable<boolean> {
        return this.isDetailStore$.asObservable();
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

    // function to handle spliting records for paginations
}
