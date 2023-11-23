import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { UserService } from "../../../../../../../shared/api/user.service";
import { mockUser } from "../../../../../../../shared/test-mocks/test-mocks";
import { MenuHeaderComponent } from "./menu-header.component";

describe("MenuHeaderComponent", () => {
    let fixture: ComponentFixture<MenuHeaderComponent>;
    let component: MenuHeaderComponent;
    let mockUserService: Partial<UserService>;

    beforeEach(() => {
        mockUserService = {
            currentUser: mockUser,
            getCurrentUser: () => of(mockUser),
        };

        TestBed.configureTestingModule({
            providers: [{ provide: UserService, useValue: mockUserService }],
        });

        fixture = TestBed.createComponent(MenuHeaderComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
