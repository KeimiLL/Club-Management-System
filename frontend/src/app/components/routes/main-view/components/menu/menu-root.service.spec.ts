import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";

import { UserService } from "../../../../../shared/api/user.service";
import { SnackbarMessages } from "../../../../../shared/models/messages.model";
import { SnackbarService } from "../../../../../shared/services/snackbar.service";
import { MenuRootService } from "./menu-root.service";

describe("MenuRootService", () => {
    let menuRootService: MenuRootService;
    let mockUserService: UserService;
    let mockRouter: Router;
    let mockSnackbarService: SnackbarService;

    beforeEach(() => {
        mockUserService = jasmine.createSpyObj(["logout"]);

        TestBed.configureTestingModule({
            providers: [
                MenuRootService,
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
                {
                    provide: UserService,
                    useValue: {
                        logout: () => of(null),
                        currentUser: null,
                    },
                },
            ],
        });

        menuRootService = TestBed.inject(MenuRootService);
        mockUserService = TestBed.inject(UserService);
        mockRouter = TestBed.inject(Router);
        mockSnackbarService = TestBed.inject(SnackbarService);
    });

    it("should log out the user successfully", () => {
        menuRootService.logout();

        expect(mockUserService.currentUser).toBeNull();
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/auth/login"]);
        expect(mockSnackbarService.showSnackBar).toHaveBeenCalledWith(
            SnackbarMessages.LOGOUT,
            "normal"
        );
    });
});
