import { TestBed } from "@angular/core/testing";

import { ModifyUsersPopupService } from "./modify-users-popup.service";

describe("ModifyUsersPopupService", () => {
    let service: ModifyUsersPopupService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModifyUsersPopupService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
