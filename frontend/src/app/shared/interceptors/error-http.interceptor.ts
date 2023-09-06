import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

import { MainRoutes } from "../models/misc.model";
import { SnackbarService } from "../services/snackbar.service";

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
    constructor(
        private readonly snack: SnackbarService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((httpResponseWithError: HttpErrorResponse) => {
                if (httpResponseWithError instanceof HttpErrorResponse) {
                    if (httpResponseWithError.status === 401) {
                        if (
                            this.activatedRoute.routeConfig?.path !==
                                undefined &&
                            this.activatedRoute.routeConfig.path !==
                                MainRoutes.Auth
                        ) {
                            this.snack.showHttpErrorSnackBar(
                                httpResponseWithError
                            );
                            this.router.parseUrl("/auth/login");
                        }
                    } else {
                        this.snack.showHttpErrorSnackBar(httpResponseWithError);
                    }
                }
                return throwError(() => httpResponseWithError);
            })
        );
    }
}
