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
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [HttpClientTestingModule, PermissionColorDirective],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
