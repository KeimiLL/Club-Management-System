import { TestBed } from "@angular/core/testing";

import { MatchEventHttpService } from "./match-event-http.service";

describe("MatchEventHttpService", () => {
    let service: MatchEventHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MatchEventHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
