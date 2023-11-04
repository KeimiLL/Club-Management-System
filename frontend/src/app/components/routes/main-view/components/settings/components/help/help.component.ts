import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { Photo, photos } from "./help.data";

@Component({
    selector: "app-help",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./help.component.html",
    styleUrls: ["./help.component.scss"],
})
export class HelpComponent {
    protected photos: Photo[] = photos;
    protected currentPhotoIndex = 0;
    protected currentPhoto: Photo = this.photos[this.currentPhotoIndex];
    protected showWelcomeCard = true;
    protected showCarousel = false;
    protected showFarewellCard = false;

    nextPhoto(): void {
        if (this.currentPhotoIndex < this.photos.length - 1) {
            this.currentPhotoIndex++;
            this.currentPhoto = this.photos[this.currentPhotoIndex];
        } else {
            this.showCarousel = false;
            this.showFarewellCard = true;
        }
    }

    previousPhoto(): void {
        if (this.currentPhotoIndex > 0) {
            this.currentPhotoIndex--;
            this.currentPhoto = this.photos[this.currentPhotoIndex];
        }
    }
}
