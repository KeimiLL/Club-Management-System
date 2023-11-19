import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { UserService } from "../../../shared/api/user.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService, UserService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AuthService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
