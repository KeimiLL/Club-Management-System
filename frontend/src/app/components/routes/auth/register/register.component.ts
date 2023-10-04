import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../../../../shared/modules/material.module";
import { AuthService } from "../auth.service";
import { RegisterFormGroup } from "../authFromBuilder";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup<RegisterFormGroup>;

    constructor(private readonly auth: AuthService) {
        this.auth.initRegisterFormGroup();
    }

    ngOnInit(): void {
        this.registerForm = this.auth.registerForm;
    }

    public onSubmit(): void {
        if (this.registerForm.valid) {
            this.auth.register();
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
