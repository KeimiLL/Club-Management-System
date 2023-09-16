import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { AddMeetingPopupComponent } from "../components/add-meeting-popup/add-meeting-popup.component";

@Injectable()
export class MeetingsPopupService {
    constructor(private readonly dialog: MatDialog) {}

    openPopup(): void {
        const dialogRef = this.dialog.open(AddMeetingPopupComponent, {
            width: "80vw",
            disableClose: true,
        });

        // dialogRef.afterClosed().subscribe((result) => );
    }
}
