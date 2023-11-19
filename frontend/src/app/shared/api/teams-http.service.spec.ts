import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { TeamsHttpService } from "./teams-http.service";

describe("TeamsHttpService", () => {
    let service: TeamsHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(TeamsHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
