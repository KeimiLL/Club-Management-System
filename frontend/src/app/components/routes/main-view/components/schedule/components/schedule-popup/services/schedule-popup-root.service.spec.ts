import { TestBed } from "@angular/core/testing";

import { SchedulePopupRootService } from "./schedule-popup-root.service";

describe("SchedulePopupRootService", () => {
    let service: SchedulePopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SchedulePopupRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
