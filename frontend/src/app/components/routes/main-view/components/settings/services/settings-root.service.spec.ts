import { TestBed } from "@angular/core/testing";

import { SettingsRootService } from "./settings-root.service";

describe("SettingsRootService", () => {
    let service: SettingsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SettingsRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
