import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { CardsModule } from "../../modules/cards.module";
import { MaterialModule } from "../../modules/material.module";

@Component({
    selector: "app-confirmation-popup",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./confirmation-popup.component.html",
    styleUrls: ["./confirmation-popup.component.scss"],
})
export class ConfirmationPopupComponent {
    constructor(
        private readonly dialogRef: MatDialogRef<ConfirmationPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string | undefined
    ) {}

    protected onCloseClick(decision: boolean): void {
        this.dialogRef.close(decision);
    }
}
