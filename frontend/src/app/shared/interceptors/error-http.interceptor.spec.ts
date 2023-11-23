import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../test-mocks/test-mocks";
import { ErrorHttpInterceptor } from "./error-http.interceptor";

describe("ErrorHttpInterceptor", () => {
    let interceptor: ErrorHttpInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule],
            providers: [
                ErrorHttpInterceptor,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        interceptor = TestBed.inject(ErrorHttpInterceptor);
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });
});
