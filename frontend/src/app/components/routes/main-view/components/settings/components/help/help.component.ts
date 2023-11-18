import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { HelpState, Photo } from "./help.data";
import { HelpCardComponent } from "./help-card/help-card.component";
import { HelpRootService } from "./help-root.service";

@Component({
    selector: "app-help",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        MatProgressBarModule,
        HelpCardComponent,
    ],
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
export class HelpComponent implements OnInit {
    protected helpState: HelpState = HelpState.Start;
    HelpState = HelpState;

    constructor(protected helpRootService: HelpRootService) {}

    ngOnInit(): void {
        this.helpRootService.helpState$.subscribe((state) => {
            this.helpState = state;
        });
    }

    protected get photos(): Photo[] {
        return this.helpRootService.getPhotos();
    }

    protected get currentPhotoIndex(): number {
        return this.helpRootService.getCurrentPhotoIndex();
    }
}
