import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Match } from "../../../../../../../shared/models/match.model";
import { SchedulePopupFormsService } from "./services/schedule-popup-forms.service";
import { SchedulePopupRootService } from "./services/schedule-popup-root.service";

@Component({
    selector: "app-schedule-popup",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./schedule-popup.component.html",
    styleUrls: ["./schedule-popup.component.scss"],
})
export class SchedulePopupComponent {
    constructor(
        private readonly forms: SchedulePopupFormsService,
        private readonly root: SchedulePopupRootService,
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match | null; teamId: number }
    ) {
        this.root.initData(this.data.teamId);
        this.forms.patchFormValue(this.data.match);
    }
}
