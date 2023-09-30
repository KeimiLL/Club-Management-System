import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";

import {
    LongMeeting,
    ShortMeeting,
} from "../../../../../shared/models/meetings.model";
import { CardsModule } from "../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../shared/services/split-view-manager.service";
import { AddMeetingPopupComponent } from "./components/add-meeting-popup/add-meeting-popup.component";
import { LegendComponent } from "./components/legend/legend.component";
import { MeetingTableComponent } from "./components/meeting-table/meeting-table.component";
import { MeetingsHttpService } from "./services/meetings-http.service";
import { MeetingsRootService } from "./services/meetings-root.service";

@Component({
    selector: "app-meetings",
    standalone: true,
    imports: [
        CommonModule,
        CardsModule,
        MaterialModule,
        LegendComponent,
        MeetingTableComponent,
    ],
    templateUrl: "./meetings.component.html",
    styleUrls: ["./meetings.component.scss"],
    providers: [
        SplitViewManagerService,
        MeetingsHttpService,
        MeetingsRootService,
    ],
})
export class MeetingsComponent implements OnInit {
    protected isDetail$: Observable<boolean>;
    protected longMeetings$: Observable<LongMeeting[]>;
    protected shortMeetings$: Observable<ShortMeeting[]>;

    constructor(
        private readonly splitService: SplitViewManagerService,
        private readonly root: MeetingsRootService,
        private readonly dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.isDetail$ = this.splitService.isDetail$;
        this.longMeetings$ = this.root.longMeetings$;
        this.shortMeetings$ = this.root.shortMeetings$;
        this.splitService.TOTAL_ITEMS = 2000;
    }

    protected switchDetail(): void {
        this.splitService.changeDetailState();
    }

    protected openAddMeetingPopup(): void {
        this.dialog.open(AddMeetingPopupComponent, {
            width: "50vw",
            disableClose: true,
        });
    }
}
