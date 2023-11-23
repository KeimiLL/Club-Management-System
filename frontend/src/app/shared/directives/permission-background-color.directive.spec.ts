import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Roles } from "../models/user.model";
import { PermissionBackgroundColorDirective } from "./permission-background-color.directive";

@Component({
    template:
        "<div appPermissionBackgroundColor [appPermissionBackgroundColor]='userRole'></div>",
})
class TestComponent {
    userRole: Roles;
}

describe("PermissionBackgroundColorDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [
                PermissionBackgroundColorDirective,
                HttpClientTestingModule,
            ],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
