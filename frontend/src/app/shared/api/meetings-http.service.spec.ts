import { TestBed } from "@angular/core/testing";

import { MeetingsHttpService } from "./meetings-http.service";

describe("MeetingsHttpService", () => {
    let service: MeetingsHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetingsHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
