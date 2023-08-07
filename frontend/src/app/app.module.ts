import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/base/footer/footer.component";
import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
    HttpClientXsrfModule,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CsrfHttpInterceptor } from "./shared/interceptors/csrf-http.interceptor";
import { UserService } from "./shared/services/user.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FooterComponent,
        MatSnackBarModule,
        HttpClientXsrfModule.withOptions({
            cookieName: "xsrf_access_token",
            headerName: "X-XSRF-TOKEN",
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CsrfHttpInterceptor,
            multi: true,
        },
        UserService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
