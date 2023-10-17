import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { UserService } from "../../../../../shared/api/user.service";
import { Roles } from "../../../../../shared/models/user.model";
import { MenuComponent } from "./menu.component";

describe("MenuComponent", () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    const userServiceMock = {
        currentUser: {
            full_name: "Janusz Tracz",
            email: "janusz.tracz@plebania.com",
            role: Roles.Admin,
            id: 1,
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule, MatSnackBarModule],
            providers: [{ provide: UserService, useValue: userServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
