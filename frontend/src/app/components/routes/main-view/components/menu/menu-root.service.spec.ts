import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";

import { UserService } from "../../../../../shared/api/user.service";
import { SnackbarMessages } from "../../../../../shared/models/messages.model";
import { SnackbarService } from "../../../../../shared/services/snackbar.service";
import { MenuRootService } from "./menu-root.service";

describe("MenuRootService", () => {
    let service: MenuRootService;
    let mockUserService: UserService;
    let mockRouter: Router;
    let mockSnackbarService: SnackbarService;

    beforeEach(() => {
        mockUserService = jasmine.createSpyObj(["logout"]);

        TestBed.configureTestingModule({
            providers: [
                MenuRootService,
                {
                    provide: UserService,
                    useValue: {
                        logout: () => of(null),
                        currentUser: null,
                    },
                },
                {
                    provide: Router,
                    useValue: {
                        navigate: jasmine.createSpy("navigate"),
                    },
                },
                {
                    provide: SnackbarService,
                    useValue: {
                        showSnackBar: jasmine.createSpy("showSnackBar"),
                    },
                },
            ],
        });

        service = TestBed.inject(MenuRootService);
        mockUserService = TestBed.inject(UserService);
        mockRouter = TestBed.inject(Router);
        mockSnackbarService = TestBed.inject(SnackbarService);
    });

    it("should log out the user successfully", () => {
        service.logout();

        expect(mockUserService.currentUser).toBeNull();
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/auth/login"]);
        expect(mockSnackbarService.showSnackBar).toHaveBeenCalledWith(
            SnackbarMessages.LOGOUT,
            "normal"
        );
    });
});
