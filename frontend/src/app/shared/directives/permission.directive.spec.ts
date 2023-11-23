import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamPermission } from "../models/permission.model";
import { PermissionDirective } from "./permission.directive";

@Component({
    template: "<div *appPermission='permission'></div>",
})
class TestComponent {
    permission: TeamPermission;
}

describe("PermissionDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [HttpClientTestingModule, PermissionDirective],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(testComponent).toBeTruthy();
    });
});
