import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
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
    animations: [
        trigger("formAnimation", [
            state("hidden", style({ height: "0", opacity: 0 })),
            state("visible", style({ height: "*", opacity: 1 })),
            transition("hidden => visible", animate("0.5s ease-in-out")),
            transition("visible => hidden", animate("0.5s ease-in-out")),
        ]),
    ],
})
export class GeneralComponent {
    protected showForm: "hidden" | "visible" = "hidden";
    changePasswordForm: FormGroup;

    protected saveChanges(): void {
        if (this.changePasswordForm.valid) {
            console.log("Changes saved");
        } else {
            console.log("Password fields are empty or invalid.");
        }
    }

    protected toggleForm(): void {
        this.showForm = this.showForm === "hidden" ? "visible" : "hidden";
    }
}
