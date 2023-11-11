import { Injectable } from "@angular/core";

import { HelpState, Photo, photos } from "./help.data";

@Injectable({
    providedIn: "root",
})
export class HelpRootService {
    public helpState: HelpState = HelpState.Start;
    public photos: Photo[] = photos;
    public currentPhotoIndex = 0;
    public currentPhoto: Photo = this.photos[this.currentPhotoIndex];

    public startGuide(): void {
        this.helpState = HelpState.Guide;
    }

    public restartGuide(): void {
        this.currentPhotoIndex = 0;
        this.currentPhoto = this.photos[this.currentPhotoIndex];
        this.helpState = HelpState.Guide;
    }

    public nextPhoto(): void {
        if (this.currentPhotoIndex < this.photos.length - 1) {
            this.currentPhotoIndex++;
            this.currentPhoto = this.photos[this.currentPhotoIndex];
        } else {
            this.helpState = HelpState.Finish;
        }
    }

    public previousPhoto(): void {
        if (this.currentPhotoIndex > 0) {
            this.currentPhotoIndex--;
            this.currentPhoto = this.photos[this.currentPhotoIndex];
        }
    }
}
