import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
    HttpClientXsrfModule,
} from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { catchError, of, tap } from "rxjs";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./components/base/footer/footer.component";
import { CsrfHttpInterceptor } from "./shared/interceptors/csrf-http.interceptor";
import { ErrorHttpInterceptor } from "./shared/interceptors/error-http.interceptor";
import { User } from "./shared/models/user.model";
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
            provide: APP_INITIALIZER,
            useFactory: (userService: UserService) => () => {
                if (!window.location.pathname.includes("/auth/")) {
                    return userService.getCurrentUser().pipe(
                        catchError(() => of(null)),
                        tap((user: User | null) => {
                            if (user !== null) {
                                userService.currentUser = user;
                            } else {
                                window.location.href = "/auth/login";
                            }
                        })
                    );
                }
                return () => null;
            },
            multi: true,
            deps: [UserService],
        },
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
