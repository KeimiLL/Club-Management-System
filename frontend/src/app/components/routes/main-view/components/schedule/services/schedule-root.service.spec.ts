import { TestBed } from "@angular/core/testing";

import { ScheduleRootService } from "./schedule-root.service";

describe("ScheduleRootService", () => {
    let service: ScheduleRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ScheduleRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
