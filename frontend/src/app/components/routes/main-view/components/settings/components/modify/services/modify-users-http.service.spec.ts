import { TestBed } from "@angular/core/testing";

import { ModifyUsersHttpService } from "./modify-users-http.service";

describe("ModifyUsersHttpService", () => {
    let service: ModifyUsersHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModifyUsersHttpService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
