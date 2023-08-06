import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpXsrfTokenExtractor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CsrfHttpInterceptor implements HttpInterceptor {
    constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let new_request = request;
        const token = this.tokenExtractor.getToken();
        if (token !== null) {
            new_request = request.clone({
                setHeaders: { "X-XSRF-TOKEN": token },
            });
        }
        return next.handle(new_request);
    }
}
