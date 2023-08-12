import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
    HttpClientXsrfModule,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./components/base/footer/footer.component";
import { CsrfHttpInterceptor } from "./shared/interceptors/csrf-http.interceptor";
import { ErrorHttpInterceptor } from "./shared/interceptors/error-http.interceptor";
import { UserService } from "./shared/services/user.service";

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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHttpInterceptor,
            multi: true,
        },
        UserService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
