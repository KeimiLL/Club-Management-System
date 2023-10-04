import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { PermissionBackgroundColorDirective } from "../../../../../../../shared/directives/permission-background-color.directive";
import { PermissionColorDirective } from "../../../../../../../shared/directives/permission-color.directive";
import { Meeting } from "../../../../../../../shared/models/meetings.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-current-meeting-content",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        PermissionBackgroundColorDirective,
        PermissionColorDirective,
    ],
    templateUrl: "./current-meeting-content.component.html",
    styleUrls: ["./current-meeting-content.component.scss"],
})
export class CurrentMeetingContentComponent {
    @Input() meeting: Meeting;
}
