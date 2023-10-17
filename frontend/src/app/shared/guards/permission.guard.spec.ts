import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "../api/user.service";
import { PermissionGuard } from "./permission.guard";

describe("PermissionGuard", () => {
    let guard: PermissionGuard;
    let userService: jasmine.SpyObj<UserService>;
    let router: jasmine.SpyObj<Router>;
    let route: ActivatedRoute;

    beforeEach(() => {
        userService = jasmine.createSpyObj("UserService", ["get currentUser"]);
        router = jasmine.createSpyObj("Router", ["parseUrl"]);

        TestBed.configureTestingModule({
            providers: [
                PermissionGuard,
                { provide: UserService, useValue: userService },
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: route },
            ],
        });

        guard = TestBed.inject(PermissionGuard);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });
});
