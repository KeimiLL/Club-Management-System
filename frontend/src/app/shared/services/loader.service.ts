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
        console.log("Start spinner");
    }

    disableSpinner(): void {
        this.spinnerMessage = "";
        this.isLoading$.next(false);
        console.log("end spinner");
    }
}
