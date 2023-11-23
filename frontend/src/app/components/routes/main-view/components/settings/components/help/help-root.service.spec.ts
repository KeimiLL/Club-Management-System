import { TestBed } from "@angular/core/testing";

import { HelpRootService } from "./help-root.service";

describe("HelpRootService", () => {
    let helpRootService: HelpRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        helpRootService = TestBed.inject(HelpRootService);
    });

    it("should be created", () => {
        expect(helpRootService).toBeTruthy();
    });
});
