import { TestBed } from "@angular/core/testing";

import { HelpRootService } from "./help-root.service";

describe("HelpRootService", () => {
    let service: HelpRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HelpRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
