import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    Validators,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
} from "@angular/forms";
import { MaterialModule } from "src/app/shared/modules/material.module";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
    }
}
