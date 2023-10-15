import { TestBed } from "@angular/core/testing";

import { TeamsPopupRootService } from "./teams-popup-root.service";

describe("TeamsPopupRootService", () => {
    let service: TeamsPopupRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TeamsPopupRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
