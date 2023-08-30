import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, RouterStateSnapshot } from "@angular/router";

import { PermissionGuard } from "./permission.guard";

describe("PermissionGuard", () => {
    let guard: PermissionGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PermissionGuard],
        });
        guard = TestBed.inject(PermissionGuard);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });

    it("should always return true", () => {
        const routeSnapshot: ActivatedRoute = {} as ActivatedRoute;
        const stateSnapshot = {} as RouterStateSnapshot;
        const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);

        expect(canActivate).toBe(true);
    });
});
