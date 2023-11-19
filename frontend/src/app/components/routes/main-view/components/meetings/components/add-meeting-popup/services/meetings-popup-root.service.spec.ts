import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { MeetingsPopupFormService } from "./meetings-popup-form.service";
import { MeetingsPopupRootService } from "./meetings-popup-root.service";

describe("MeetingsPopupRootService", () => {
    let service: MeetingsPopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MeetingsPopupRootService, MeetingsPopupFormService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MeetingsPopupRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
