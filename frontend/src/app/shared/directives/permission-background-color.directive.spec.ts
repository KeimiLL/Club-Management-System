import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserService } from "../api/user.service";
import { Roles, User } from "../models/user.model";
import { PermissionBackgroundColorDirective } from "./permission-background-color.directive";

const mockUser: User = {
    full_name: "admin",
    id: 1,
    role: Roles.Admin,
    email: "test@cms.com",
};

class MockUserService {
    currentUser = mockUser;
}

@Component({
    template:
        "<div appPermissionBackgroundColor [appPermissionBackgroundColor]='userRole'></div>",
})
class TestComponent {
    userRole: Roles;
}

describe("PermissionBackgroundColorDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PermissionBackgroundColorDirective],
            providers: [{ provide: UserService, useClass: MockUserService }],
        });
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(testComponent).toBeTruthy();
    });
});
