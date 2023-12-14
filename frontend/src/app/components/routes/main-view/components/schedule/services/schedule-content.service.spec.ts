import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ScheduleContentService } from "./schedule-content.service";

describe("ScheduleContentService", () => {
    let scheduleContentService: ScheduleContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScheduleContentService],
        });

        scheduleContentService = TestBed.inject(ScheduleContentService);
    });

    it("should be created", () => {
        expect(scheduleContentService).toBeTruthy();
    });
});
