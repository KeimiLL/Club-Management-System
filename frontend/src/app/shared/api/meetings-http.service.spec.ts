import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MeetingsHttpService } from "./meetings-http.service";

describe("MeetingsHttpService", () => {
    let metingsHttpService: MeetingsHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        metingsHttpService = TestBed.inject(MeetingsHttpService);
    });

    it("should be created", () => {
        expect(metingsHttpService).toBeTruthy();
    });
});
