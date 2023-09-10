import { TestBed } from "@angular/core/testing";

import { SplitViewManagerService } from "./split-view-manager.service";

describe("SplitViewManagerService", () => {
    let service: SplitViewManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SplitViewManagerService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
