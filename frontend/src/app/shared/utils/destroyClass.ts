import { Injectable, OnDestroy } from "@angular/core";
import { MonoTypeOperatorFunction, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable()
export class DestroyClass implements OnDestroy {
    protected destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil(this.destroy$);
    }
}
