import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { PlayersHttpService } from "./players-http.service";

describe("PlayersHttpService", () => {
    let playersHttpService: PlayersHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        playersHttpService = TestBed.inject(PlayersHttpService);
    });

    it("should be created", () => {
        expect(playersHttpService).toBeTruthy();
    });
});
