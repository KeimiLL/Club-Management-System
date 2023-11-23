import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { MeetingsPopupActionsService } from "./meetings-popup-actions.service";
import { MeetingsPopupFormService } from "./meetings-popup-form.service";

describe("MeetingsPopupActionsService", () => {
    let meetingsPopupActionsService: MeetingsPopupActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            providers: [
                MeetingsPopupActionsService,
                MeetingsPopupFormService,
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        meetingsPopupActionsService = TestBed.inject(
            MeetingsPopupActionsService
        );
    });

    it("should be created", () => {
        expect(meetingsPopupActionsService).toBeTruthy();
    });
});
