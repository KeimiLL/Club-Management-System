import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-general",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule],
    templateUrl: "./general.component.html",
    styleUrls: ["./general.component.scss"],
})
export class GeneralComponent {
    changePasswordForm: FormGroup;

    saveChanges(): void {
        if (this.changePasswordForm.valid) {
            console.log("Changes saved");
        } else {
            console.log("Password fields are empty or invalid.");
        }
    }
}
