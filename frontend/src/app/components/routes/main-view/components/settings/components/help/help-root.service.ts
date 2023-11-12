import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { HelpState, Photo, photos } from "./help.data";

@Injectable({
    providedIn: "root",
})
export class HelpRootService {
    private currentPhotoIndex = 0;
    private readonly photos: Photo[] = photos;
    private readonly helpStateSubject$ = new BehaviorSubject<HelpState>(
        HelpState.Start
    );

    private set helpState(helpState: HelpState) {
        this.helpStateSubject$.next(helpState);
    }

    public get helpState(): HelpState {
        return this.helpStateSubject$.value;
    }

    public get helpState$(): Observable<HelpState> {
        return this.helpStateSubject$.asObservable();
    }

    public startGuide(): void {
        this.helpState = HelpState.Guide;
    }

    public restartGuide(): void {
        this.currentPhotoIndex = 0;
        this.helpState = HelpState.Guide;
    }

    public nextPhoto(): void {
        if (this.currentPhotoIndex < this.photos.length - 1) {
            this.currentPhotoIndex++;
            this.helpState = HelpState.Guide;
        } else {
            this.helpState = HelpState.Finish;
        }
    }

    public previousPhoto(): void {
        if (this.currentPhotoIndex > 0) {
            this.currentPhotoIndex--;
            this.helpState = HelpState.Guide;
        }
    }

    public toggleFarewellCard(): void {
        this.helpState = HelpState.Finish;
    }

    public getPhotos(): Photo[] {
        return this.photos;
    }

    public getCurrentPhotoIndex(): number {
        return this.currentPhotoIndex;
    }
}
