import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { Photo, photos } from "./help.data";

@Component({
    selector: "app-help",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, MatProgressBarModule],
    templateUrl: "./help.component.html",
    styleUrls: ["./help.component.scss"],
    animations: [
        trigger("photoAnimation", [
            transition("* => *", [
                style({ opacity: 0, transform: "scale(0.9)" }),
                animate("300ms", style({ opacity: 1, transform: "scale(1)" })),
            ]),
        ]),
    ],
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
