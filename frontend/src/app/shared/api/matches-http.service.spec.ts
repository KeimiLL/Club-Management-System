import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MatchesHttpService } from "./matches-http.service";

describe("MatchesHttpService", () => {
    let matchesHttpService: MatchesHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        matchesHttpService = TestBed.inject(MatchesHttpService);
    });

    it("should be created", () => {
        expect(matchesHttpService).toBeTruthy();
    });
});
