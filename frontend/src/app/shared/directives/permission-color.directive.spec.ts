import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Roles } from "../models/user.model";
import { PermissionColorDirective } from "./permission-color.directive";

@Component({
    template: "<div appPermissionColor [appPermissionColor]='userRole'></div>",
})
class TestComponent {
    userRole: Roles;
}

describe("PermissionColorDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PermissionColorDirective, HttpClientTestingModule],
        });
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the component", () => {
        expect(testComponent).toBeTruthy();
    });
});
