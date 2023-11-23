import { TestBed } from "@angular/core/testing";

import { MeetingsPopupFormService } from "./meetings-popup-form.service";

describe("MeetingsPopupFormService", () => {
    let meetingsPopupFormService: MeetingsPopupFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MeetingsPopupFormService],
        });

        meetingsPopupFormService = TestBed.inject(MeetingsPopupFormService);
    });

    it("should be created", () => {
        expect(meetingsPopupFormService).toBeTruthy();
    });
});
