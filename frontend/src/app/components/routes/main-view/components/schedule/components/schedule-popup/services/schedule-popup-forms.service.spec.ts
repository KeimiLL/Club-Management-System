import { TestBed } from "@angular/core/testing";

import { SchedulePopupFormsService } from "./schedule-popup-forms.service";

describe("SchedulePopupFormsService", () => {
    let service: SchedulePopupFormsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SchedulePopupFormsService],
        });
        service = TestBed.inject(SchedulePopupFormsService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
