import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { UserService } from "../../../shared/api/user.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, UserService],
        });

        authService = TestBed.inject(AuthService);
    });

    it("should be created", () => {
        expect(authService).toBeTruthy();
    });
});
