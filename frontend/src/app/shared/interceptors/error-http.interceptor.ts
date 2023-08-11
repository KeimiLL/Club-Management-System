import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { SnackbarService } from "../services/snackbar.service";

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
    constructor(private readonly snack: SnackbarService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((httpResponseWithError: HttpErrorResponse) => {
                if (httpResponseWithError instanceof HttpErrorResponse) {
                    this.snack.showErrorSnackBar(httpResponseWithError);
                }

                return throwError(() => httpResponseWithError);
            })
        );
    }
}
