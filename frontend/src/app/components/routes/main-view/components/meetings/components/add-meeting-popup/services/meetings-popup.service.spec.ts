import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { SnackbarService } from "../../../../../../../../shared/services/snackbar.service";
import { MeetingsPopupService } from "./meetings-popup.service";
import { MeetingsPopupHttpService } from "./meetings-popup-http.service";

describe("MeetingsPopupService", () => {
    let service: MeetingsPopupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatSnackBarModule,
            ],
            providers: [
                MeetingsPopupService,
                MeetingsPopupHttpService,
                SnackbarService,
                FormBuilder,
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        service = TestBed.inject(MeetingsPopupService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
