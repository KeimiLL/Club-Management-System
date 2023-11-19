import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { MeetingsPopupActionsService } from "./meetings-popup-actions.service";
import { MeetingsPopupFormService } from "./meetings-popup-form.service";

describe("MeetingsPopupActionsService", () => {
    let service: MeetingsPopupActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MeetingsPopupActionsService,
                MeetingsPopupFormService,
                { provide: MatDialogRef, useValue: {} },
            ],
            imports: [HttpClientTestingModule, MatSnackBarModule],
        });
        service = TestBed.inject(MeetingsPopupActionsService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
