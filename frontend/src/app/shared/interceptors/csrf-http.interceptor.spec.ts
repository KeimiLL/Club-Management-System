import { TestBed } from "@angular/core/testing";

import { CsrfHttpInterceptor } from "./csrf-http.interceptor";

describe("CsrfHttpInterceptor", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [CsrfHttpInterceptor],
        })
    );

    it("should be created", () => {
        const interceptor: CsrfHttpInterceptor =
            TestBed.inject(CsrfHttpInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
