import { TestBed } from "@angular/core/testing";

import { MenuRootService } from "./menu-root.service";

describe("MenuRootService", () => {
    let service: MenuRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MenuRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
