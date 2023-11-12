import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { HelpState, Photo, photos } from "./help.data";

@Injectable({
    providedIn: "root",
})
export class HelpRootService {
    private currentPhotoIndex = 0;
    private readonly photos: Photo[] = photos;
    private readonly helpStateSubject = new BehaviorSubject<HelpState>(
        HelpState.Start
    );

    helpState$ = this.helpStateSubject.asObservable();

    public startGuide(): void {
        this.helpStateSubject.next(HelpState.Guide);
    }

    public restartGuide(): void {
        this.currentPhotoIndex = 0;
        this.helpStateSubject.next(HelpState.Guide);
    }

    public nextPhoto(): void {
        if (this.currentPhotoIndex < this.photos.length - 1) {
            this.currentPhotoIndex++;
            this.helpStateSubject.next(HelpState.Guide);
        } else {
            this.helpStateSubject.next(HelpState.Finish);
        }
    }

    public previousPhoto(): void {
        if (this.currentPhotoIndex > 0) {
            this.currentPhotoIndex--;
            this.helpStateSubject.next(HelpState.Guide);
        }
    }

    public toggleFarewellCard(): void {
        this.helpStateSubject.next(HelpState.Finish);
    }

    public getPhotos(): Photo[] {
        return this.photos;
    }

    public getCurrentPhotoIndex(): number {
        return this.currentPhotoIndex;
    }
}
