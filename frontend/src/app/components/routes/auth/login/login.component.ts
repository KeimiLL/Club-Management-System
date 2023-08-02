import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
// export class LoginComponent implements OnInit {
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    // ngOnInit(): void {

    // }

    // onSubmit() {

    // }

    passwordMatchValidator(formGroup: FormGroup) {
        const passwordControl = formGroup.get("password");
        const confirmPasswordControl = formGroup.get("confirmPassword");

        if (passwordControl?.value !== confirmPasswordControl?.value) {
            confirmPasswordControl?.setErrors({ passwordMismatch: true });
        } else {
            confirmPasswordControl?.setErrors(null);
        }
    }
}
