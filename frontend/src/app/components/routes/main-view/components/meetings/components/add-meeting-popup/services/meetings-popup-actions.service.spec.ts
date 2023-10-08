import { TestBed } from "@angular/core/testing";

import { MeetingsPopupActionsService } from "./meetings-popup-actions.service";

describe("MeetingsPopupActionsService", () => {
    let service: MeetingsPopupActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetingsPopupActionsService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
