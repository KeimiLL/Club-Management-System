import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MeetingsPopupFormService } from "./meetings-popup-form.service";
import { MeetingsPopupRootService } from "./meetings-popup-root.service";

describe("MeetingsPopupRootService", () => {
    let meetingsPopupRootService: MeetingsPopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MeetingsPopupFormService, MeetingsPopupRootService],
            imports: [HttpClientTestingModule],
        });

        meetingsPopupRootService = TestBed.inject(MeetingsPopupRootService);
    });

    it("should be created", () => {
        expect(meetingsPopupRootService).toBeTruthy();
    });
});
