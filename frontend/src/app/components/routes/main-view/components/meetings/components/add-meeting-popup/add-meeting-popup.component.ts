import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-add-meeting-popup",
    standalone: true,
    imports: [CommonModule, MaterialModule, CardsModule],
    templateUrl: "./add-meeting-popup.component.html",
    styleUrls: ["./add-meeting-popup.component.scss"],
})
export class AddMeetingPopupComponent {
    constructor(
        private readonly dialogRef: MatDialogRef<AddMeetingPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {}

    protected onCloseClick(): void {
        this.dialogRef.close();
    }
}
