import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";

import { ModifyUsersPopupService } from "./modify-users-popup.service";

describe("ModifyUsersPopupService", () => {
    let service: ModifyUsersPopupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, HttpClientTestingModule],
            providers: [ModifyUsersPopupService],
        });
        service = TestBed.inject(ModifyUsersPopupService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
