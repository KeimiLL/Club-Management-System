import { HttpXsrfTokenExtractor } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { CsrfHttpInterceptor } from "./csrf-http.interceptor";

describe("CsrfHttpInterceptor", () => {
    let interceptor: CsrfHttpInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CsrfHttpInterceptor, HttpXsrfTokenExtractor],
        });

        interceptor = TestBed.inject(CsrfHttpInterceptor);
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });
});
