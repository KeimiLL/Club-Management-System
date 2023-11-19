import { TestBed } from "@angular/core/testing";

import { MeetingsPopupFormService } from "./meetings-popup-form.service";

describe("MeetingsPopupFormService", () => {
    let service: MeetingsPopupFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MeetingsPopupFormService],
        });
        service = TestBed.inject(MeetingsPopupFormService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
