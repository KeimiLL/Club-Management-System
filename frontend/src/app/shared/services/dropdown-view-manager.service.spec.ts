import { TestBed } from "@angular/core/testing";

import { DropdownViewManagerService } from "./dropdown-view-manager.service";

describe("DropdownViewManagerService", () => {
    let service: DropdownViewManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DropdownViewManagerService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
