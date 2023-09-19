import { TestBed } from "@angular/core/testing";

import { MeetingsPopupService } from "./meetings-popup.service";

describe("MeetingsPopupService", () => {
    let service: MeetingsPopupService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetingsPopupService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
