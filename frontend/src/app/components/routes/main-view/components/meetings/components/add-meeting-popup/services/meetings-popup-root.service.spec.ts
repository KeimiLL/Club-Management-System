import { TestBed } from "@angular/core/testing";

import { MeetingsPopupRootService } from "./meetings-popup-root.service";

describe("MeetingsPopupRootService", () => {
    let service: MeetingsPopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetingsPopupRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
