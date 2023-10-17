import { TestBed } from "@angular/core/testing";

import { CoachesHttpService } from "./coaches-http.service";

describe("CoachesHttpService", () => {
    let service: CoachesHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CoachesHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
