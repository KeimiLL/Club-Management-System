import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { CoachesHttpService } from "./coaches-http.service";

describe("CoachesHttpService", () => {
    let coachesHttpService: CoachesHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        coachesHttpService = TestBed.inject(CoachesHttpService);
    });

    it("should be created", () => {
        expect(coachesHttpService).toBeTruthy();
    });
});
