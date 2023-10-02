import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";

import { SnackbarService } from "../services/snackbar.service";
import { ErrorHttpInterceptor } from "./error-http.interceptor";

describe("ErrorHttpInterceptor", () => {
    let interceptor: ErrorHttpInterceptor;
    let snackService: jasmine.SpyObj<SnackbarService>;
    let router: jasmine.SpyObj<Router>;
    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
        snackService = jasmine.createSpyObj("SnackbarService", [
            "showHttpErrorSnackBar",
        ]);
        router = jasmine.createSpyObj("Router", ["parseUrl"]);

        TestBed.configureTestingModule({
            providers: [
                ErrorHttpInterceptor,
                { provide: SnackbarService, useValue: snackService },
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: activatedRoute },
            ],
        });

        interceptor = TestBed.inject(ErrorHttpInterceptor);
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });
});
