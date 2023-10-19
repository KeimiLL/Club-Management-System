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

import { SnackbarMessages } from "../models/messages.model";
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
                    switch (httpResponseWithError.status) {
                        case 0:
                            break;
                        case 401: {
                            this.snack.showSnackBar(
                                SnackbarMessages.NOT_LOGGED,
                                "warn"
                            );
                            break;
                        }
                        case 403:
                            this.snack.showSnackBar(
                                SnackbarMessages.NO_PERMISSION,
                                "warn"
                            );
                            break;

                        case 404:
                            this.snack.showSnackBar(
                                SnackbarMessages.NO_CONTENT,
                                "warn"
                            );
                            break;
                        default: {
                            this.snack.showHttpErrorSnackBar(
                                httpResponseWithError
                            );
                            break;
                        }
                    }
                }
                return throwError(() => httpResponseWithError);
            })
        );
    }
}
