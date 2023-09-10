import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SplitViewManagerService {
    private readonly isDetailStore$ = new BehaviorSubject<boolean>(false);

    public changeDetailState(): void {
        this.isDetailStore$.next(!this.isDetail);
    }

    public get isDetail(): boolean {
        return this.isDetailStore$.value;
    }

    public get isDetail$(): Observable<boolean> {
        return this.isDetailStore$.asObservable();
    }

    // functions to handle pagination

    // function to handle spliting records for paginations
}
