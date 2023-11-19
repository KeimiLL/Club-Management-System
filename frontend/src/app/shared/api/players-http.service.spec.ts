import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { PlayersHttpService } from "./players-http.service";

describe("PlayersHttpService", () => {
    let service: PlayersHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(PlayersHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
