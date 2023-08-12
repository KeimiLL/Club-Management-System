import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpXsrfTokenExtractor,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CsrfHttpInterceptor implements HttpInterceptor {
    constructor(private readonly tokenExtractor: HttpXsrfTokenExtractor) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let newRequest = request;
        const token = this.tokenExtractor.getToken();
        if (token !== null) {
            newRequest = request.clone({
                setHeaders: { "X-XSRF-TOKEN": token },
            });
        }
        return next.handle(newRequest);
    }
}
