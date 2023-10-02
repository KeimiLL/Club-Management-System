import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MeetingsHttpService } from "./meetings-http.service";
import { MeetingsRootService } from "./meetings-root.service";

describe("MeetingsRootService", () => {
    let mockService: MeetingsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MeetingsRootService, MeetingsHttpService],
        });
        mockService = TestBed.inject(MeetingsRootService);
    });

    it("should be created", () => {
        expect(mockService).toBeTruthy();
    });
});
