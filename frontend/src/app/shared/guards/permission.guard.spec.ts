import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { PermissionGuard } from "./permission.guard";

describe("PermissionGuard", () => {
    let guard: PermissionGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PermissionGuard],
        });

        guard = TestBed.inject(PermissionGuard);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });
});
