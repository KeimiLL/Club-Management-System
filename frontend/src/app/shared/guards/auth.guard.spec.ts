import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, RouterStateSnapshot } from "@angular/router";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard],
        });
        guard = TestBed.inject(AuthGuard);
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
