import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { SchedulePopupFormsService } from "./schedule-popup-forms.service";
import { SchedulePopupRootService } from "./schedule-popup-root.service";

describe("SchedulePopupRootService", () => {
    let schedulePopupRootService: SchedulePopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [
                SchedulePopupFormsService,
                SchedulePopupRootService,
                { provide: MatDialogRef, useValue: {} },
            ],
        });

        schedulePopupRootService = TestBed.inject(SchedulePopupRootService);
    });

    it("should be created", () => {
        expect(schedulePopupRootService).toBeTruthy();
    });
});
