import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

import { ChangePassword } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import {
    resetPasswordFormBuilder,
    ResetPasswordFormGroup,
} from "../../../../../auth/authFromBuilder";
import { SettingsRootService } from "../../services/settings-root.service";

@Component({
    selector: "app-general",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, ReactiveFormsModule],
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
    public resetPasswordForm: FormGroup<ResetPasswordFormGroup>;
    protected showForm: "hidden" | "visible" = "hidden";

    constructor(private readonly root: SettingsRootService) {
        this.resetPasswordForm =
            resetPasswordFormBuilder.buildResetPasswordFormGroup();
    }

    protected saveChanges(): void {
        const changePassword: ChangePassword = {
            new_password: this.resetPasswordForm.controls.newPassword.value,
            old_password: this.resetPasswordForm.controls.oldPassword.value,
        };
        this.root.changeOwnPassword(changePassword);
    }

    protected toggleForm(): void {
        this.showForm = this.showForm === "hidden" ? "visible" : "hidden";
    }
}
