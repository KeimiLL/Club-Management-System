import { TestBed } from "@angular/core/testing";

import { TeamsRootService } from "./teams-root.service";

describe("TeamsRootService", () => {
    let service: TeamsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TeamsRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
