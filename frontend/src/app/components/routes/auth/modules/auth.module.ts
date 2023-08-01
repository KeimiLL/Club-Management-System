import "../login/login.component"
import "../register/register.component"
import "@angular/common"
import "@angular/core"
import "@angular/forms"
import "@angular/material/button"
import "@angular/material/card"
import "@angular/material/input"
import "@angular/platform-browser/animations"
import "@angular/router"
import { BrowserAnimationsModule }
import { CommonModule }
import { LoginComponent }
import { MatButtonModule }
import { MatCardModule }
import { MatInputModule }
import { NgModule }
import { ReactiveFormsModule }
import { RegisterComponent }
import { RouterModule }


@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "", redirectTo: "login", pathMatch: "full" },
        ]),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
    ],
})
export class AuthModule {}
