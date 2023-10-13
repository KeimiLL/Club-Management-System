import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LoaderService {
    private readonly isLoadingStore$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    public set isLoading(b: boolean) {
        this.isLoadingStore$.next(b);
    }

    public get isLoading(): boolean {
        return this.isLoadingStore$.value;
    }

    public get isLoading$(): Observable<boolean> {
        return this.isLoadingStore$.asObservable();
    }

    public enableSpinner(): void {
        console.log("WCHODZI");
        this.isLoading = true;
    }

    public disableSpinner(): void {
        console.log("WYCHODZI");
        this.isLoading = false;
    }
}
