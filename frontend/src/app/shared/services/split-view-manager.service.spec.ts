import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { SplitViewManagerService } from "./split-view-manager.service";

class MockActivatedRoute {
    queryParams = new BehaviorSubject({});
}

class MockRouter {
    navigate = jasmine.createSpy("navigate");
}

describe("SplitViewManagerService", () => {
    let mockService: SplitViewManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SplitViewManagerService,
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: Router, useClass: MockRouter },
            ],
        });
        mockService = TestBed.inject(SplitViewManagerService);
    });

    it("should be created", () => {
        expect(mockService).toBeTruthy();
    });
});
