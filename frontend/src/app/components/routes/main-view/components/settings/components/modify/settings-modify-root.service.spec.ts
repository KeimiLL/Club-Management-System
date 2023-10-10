import { TestBed } from "@angular/core/testing";

import { SettingsModifyRootService } from "./settings-modify-root.service";

describe("SettingsModifyRootService", () => {
    let service: SettingsModifyRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SettingsModifyRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
