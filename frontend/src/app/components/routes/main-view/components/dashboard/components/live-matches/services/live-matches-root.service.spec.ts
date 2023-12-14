import { TestBed } from "@angular/core/testing";

import { LiveMatchesRootService } from "./live-matches-root.service";

describe("LiveMatchesRootService", () => {
    let service: LiveMatchesRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LiveMatchesRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
