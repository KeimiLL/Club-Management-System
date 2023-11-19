import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserService } from "../api/user.service";
import { Roles, User } from "../models/user.model";
import { RoleDirective } from "./role.directive";

const mockUser: User = {
    full_name: "admin",
    id: 1,
    role: Roles.Admin,
    email: "test@cms.com",
};

@Component({
    template: "<div *appRole='requiredRole' class='content'>Content</div>",
})
class TestComponent {
    requiredRole: Roles = Roles.Admin;
}

describe("RoleDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let mockUserService: Partial<UserService>;

    beforeEach(() => {
        mockUserService = {
            currentUser: mockUser,
        };

        TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [{ provide: UserService, useValue: mockUserService }],
            imports: [RoleDirective],
        });

        fixture = TestBed.createComponent(TestComponent);
    });

    it("should create the component", () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should show the template when the user has the required role", () => {
        fixture.detectChanges();

        const element = fixture.nativeElement.querySelector(".content");
        expect(element).toBeTruthy();
    });

    it("should not show the template when the user does not have the required role", () => {
        mockUserService.currentUser = { ...mockUser, role: Roles.Viewer };

        fixture.detectChanges();

        const element = fixture.nativeElement.querySelector(".content");
        expect(element).toBeFalsy();
    });
});
