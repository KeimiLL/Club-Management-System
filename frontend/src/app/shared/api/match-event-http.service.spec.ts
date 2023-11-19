import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MatchEventHttpService } from "./match-event-http.service";

describe("MatchEventHttpService", () => {
    let service: MatchEventHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MatchEventHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
