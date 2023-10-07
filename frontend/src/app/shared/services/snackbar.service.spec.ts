import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";

import { SnackbarService } from "./snackbar.service";

describe("SnackbarService", () => {
    let mockService: SnackbarService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const snackBarSpyObj = jasmine.createSpyObj("MatSnackBar", [
            "openFromComponent",
        ]);

        TestBed.configureTestingModule({
            providers: [
                SnackbarService,
                { provide: MatSnackBar, useValue: snackBarSpyObj },
            ],
        });

        mockService = TestBed.inject(SnackbarService);
        snackBarSpy = TestBed.inject(
            MatSnackBar
        ) as jasmine.SpyObj<MatSnackBar>;
    });

    it("should be created", () => {
        expect(mockService).toBeTruthy();
    });

    it("should call snackBar.openFromComponent with the correct parameters for showSnackBar", () => {
        const message = "Test message";
        const variant = "normal";
        const time = 3000;

        mockService.showSnackBar(message, variant, time);

        expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
            jasmine.any(Function),
            {
                data: { message, variant },
                duration: time,
            }
        );
    });

    it("should call snackBar.openFromComponent with the correct parameters for showHttpErrorSnackBar", () => {
        const response = new HttpErrorResponse({
            status: 404,
            statusText: "Not Found",
        });
        const time = 3000;

        mockService.showHttpErrorSnackBar(response, time);

        expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
            jasmine.any(Function),
            {
                data: {
                    message: `Error: ${response.status}, ${response.statusText}`,
                    variant: "error",
                },
                duration: time,
            }
        );
    });
});
