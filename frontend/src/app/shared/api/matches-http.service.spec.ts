import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MatchesHttpService } from "./matches-http.service";

describe("MatchesHttpService", () => {
    let service: MatchesHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MatchesHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
