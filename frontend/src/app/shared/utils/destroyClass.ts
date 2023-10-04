import { Injectable, OnDestroy } from "@angular/core";
import { MonoTypeOperatorFunction, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable()
export class DestoryClass implements OnDestroy {
    protected destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected untilDestroyed(): MonoTypeOperatorFunction<unknown> {
        return takeUntil(this.destroy$);
    }
}
