import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { SpinnerComponent } from "../../../../../../../shared/components/spinner/spinner.component";
import { PermissionBackgroundColorDirective } from "../../../../../../../shared/directives/permission-background-color.directive";
import { PermissionColorDirective } from "../../../../../../../shared/directives/permission-color.directive";
import { Meeting } from "../../../../../../../shared/models/meeting.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { LoaderService } from "../../../../../../../shared/services/loader.service";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";

@Component({
    selector: "app-current-meeting-content",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        PermissionBackgroundColorDirective,
        PermissionColorDirective,
        SpinnerComponent,
    ],
    providers: [LoaderService],
    templateUrl: "./current-meeting-content.component.html",
    styleUrls: ["./current-meeting-content.component.scss"],
})
export class CurrentMeetingContentComponent implements OnInit {
    @Input() public meeting: Meeting;
    protected isCurrentMeetingLoading$: Observable<boolean>;
    protected spinnerMessage = "Loading selected meeting...";

    constructor(private readonly splitView: SplitViewManagerService<Meeting>) {}

    ngOnInit(): void {
        this.isCurrentMeetingLoading$ = this.splitView.isLoading$;
    }
}
