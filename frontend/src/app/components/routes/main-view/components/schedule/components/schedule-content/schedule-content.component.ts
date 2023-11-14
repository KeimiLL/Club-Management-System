import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { MatchContentType } from "../../../../../../../shared/models/match.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { ScheduleContentService } from "../../services/schedule-content.service";

@Component({
    selector: "app-schedule-content",
    standalone: true,
    imports: [CommonModule, MaterialModule, CardsModule],
    templateUrl: "./schedule-content.component.html",
    styleUrls: ["./schedule-content.component.scss"],
})
export class ScheduleContentComponent {
    protected readonly contentTypes = MatchContentType;
    protected readonly contentType$: Observable<MatchContentType>;

    constructor(private readonly content: ScheduleContentService) {
        this.contentType$ = this.content.contentType$;
    }

    protected toggleContentType(contentType: MatchContentType): void {
        this.content.toggleContentType(contentType);
    }
}
