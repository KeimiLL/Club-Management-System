import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MatchEventHttpService } from "./match-event-http.service";

describe("MatchEventHttpService", () => {
    let matchEventHttpService: MatchEventHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        matchEventHttpService = TestBed.inject(MatchEventHttpService);
    });

    it("should be created", () => {
        expect(matchEventHttpService).toBeTruthy();
    });
});
