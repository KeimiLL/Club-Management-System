import { TestBed } from "@angular/core/testing";

import { MeetingsRootService } from "./meetings-root.service";

describe("MeetingsRootService", () => {
    let service: MeetingsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetingsRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
