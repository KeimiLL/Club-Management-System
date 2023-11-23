import { TestBed } from "@angular/core/testing";

import { SchedulePopupFormsService } from "./schedule-popup-forms.service";

describe("SchedulePopupFormsService", () => {
    let schedulePopupFormsService: SchedulePopupFormsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SchedulePopupFormsService],
        });

        schedulePopupFormsService = TestBed.inject(SchedulePopupFormsService);
    });

    it("should be created", () => {
        expect(schedulePopupFormsService).toBeTruthy();
    });
});
