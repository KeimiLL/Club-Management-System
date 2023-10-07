import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { Roles } from "../../../../../../../shared/models/user.model";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { UserService } from "../../../../../../../shared/services/user.service";
import { MenuHeaderComponent } from "./menu-header.component";

describe("MenuHeaderComponent", () => {
    let fixture: ComponentFixture<MenuHeaderComponent>;

    const userServiceMock = {
        currentUser: {
            full_name: "Janusz Tracz",
            email: "janusz.tracz@plebania.com",
            role: Roles.Admin,
            id: 1,
        },
        getCurrentUser: () => of(userServiceMock.currentUser),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, MaterialModule],
            providers: [{ provide: UserService, useValue: userServiceMock }],
        });

        fixture = TestBed.createComponent(MenuHeaderComponent);
    });

    it("should be created", () => {
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
