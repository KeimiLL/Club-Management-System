import { TestBed } from "@angular/core/testing";

import { ScheduleContentService } from "./schedule-content.service";

describe("ScheduleContentService", () => {
    let service: ScheduleContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ScheduleContentService],
        });
        service = TestBed.inject(ScheduleContentService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
