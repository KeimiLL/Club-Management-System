import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";

import { UserService } from "../../../shared/api/user.service";
import {
    ActivatedRouteQueryParams,
    mockUser,
} from "../../../shared/test-mocks/test-mocks";
import { MainViewComponent } from "./main-view.component";

describe("MainViewComponent", () => {
    let fixture: ComponentFixture<MainViewComponent>;
    let component: MainViewComponent;
    let mockUserService: Partial<UserService>;

    beforeEach(() => {
        mockUserService = {
            currentUser: mockUser,
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
                { provide: UserService, useValue: mockUserService },
            ],
        });

        fixture = TestBed.createComponent(MainViewComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
