import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { TableService } from "../../../../../../../../shared/services/table.service";
import { ModifyUsersPopupService } from "./modify-users-popup.service";
import { SettingsModifyRootService } from "./settings-modify-root.service";

describe("SettingsModifyRootService", () => {
    let service: SettingsModifyRootService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                MatDialogModule,
            ],
            providers: [
                SettingsModifyRootService,
                TableService,
                ModifyUsersPopupService,
            ],
        });
        service = TestBed.inject(SettingsModifyRootService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
