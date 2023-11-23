import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";

import { ModifyUsersPopupService } from "./modify-users-popup.service";

describe("ModifyUsersPopupService", () => {
    let modifyUsersPopupService: ModifyUsersPopupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            providers: [ModifyUsersPopupService],
        });
        modifyUsersPopupService = TestBed.inject(ModifyUsersPopupService);
    });

    it("should be created", () => {
        expect(modifyUsersPopupService).toBeTruthy();
    });
});
