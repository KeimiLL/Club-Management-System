import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MeetingsHttpService } from "./meetings-http.service";

describe("MeetingsHttpService", () => {
    let mockService: MeetingsHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MeetingsHttpService],
        });
        mockService = TestBed.inject(MeetingsHttpService);
    });

    it("should be created", () => {
        expect(mockService).toBeTruthy();
    });
});
