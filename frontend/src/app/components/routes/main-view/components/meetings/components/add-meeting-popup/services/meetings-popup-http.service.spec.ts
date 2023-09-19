import { TestBed } from "@angular/core/testing";

import { MeetingsPopupHttpService } from "./meetings-popup-http.service";

describe("MeetingsPopupHttpService", () => {
    let service: MeetingsPopupHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetingsPopupHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
