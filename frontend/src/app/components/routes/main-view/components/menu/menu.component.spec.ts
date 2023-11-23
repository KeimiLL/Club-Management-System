import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { UserService } from "../../../../../shared/api/user.service";
import { mockUser } from "../../../../../shared/test-mocks/test-mocks";
import { MenuComponent } from "./menu.component";

describe("MenuComponent", () => {
    let fixture: ComponentFixture<MenuComponent>;
    let component: MenuComponent;
    let mockUserService: Partial<UserService>;

    beforeEach(async () => {
        mockUserService = {
            currentUser: mockUser,
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            providers: [{ provide: UserService, useValue: mockUserService }],
        });

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
