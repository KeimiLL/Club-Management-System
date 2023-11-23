import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { SettingsRootService } from "./settings-root.service";

describe("SettingsRootService", () => {
    let settingsRootService: SettingsRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            providers: [SettingsRootService],
        });

        settingsRootService = TestBed.inject(SettingsRootService);
    });

    it("should be created", () => {
        expect(settingsRootService).toBeTruthy();
    });
});
