import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../../../../shared/modules/material.module";
import { AuthService } from "../auth.service";
import { LoginFormGroup } from "../authFromBuilder";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup<LoginFormGroup>;

    constructor(private readonly auth: AuthService) {
        this.auth.initLoginFormGroup();
    }

    ngOnInit(): void {
        this.loginForm = this.auth.loginForm;
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            this.auth.login();
        }
    }
}
