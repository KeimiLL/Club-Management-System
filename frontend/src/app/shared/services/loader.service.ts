import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LoaderService {
    spinnerMessage = "";
    public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    enableSpinner(message?: string): void {
        this.spinnerMessage = message ?? "Loading";
        this.isLoading$.next(true);
    }

    disableSpinner(): void {
        this.spinnerMessage = "";
        this.isLoading$.next(false);
    }
}
