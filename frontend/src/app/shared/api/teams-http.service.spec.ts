import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { TeamsHttpService } from "./teams-http.service";

describe("TeamsHttpService", () => {
    let teamsHttpService: TeamsHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        teamsHttpService = TestBed.inject(TeamsHttpService);
    });

    it("should be created", () => {
        expect(teamsHttpService).toBeTruthy();
    });
});
