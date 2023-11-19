import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "../../../../shared/api/user.service";

@Component({
    selector: "app-login",
    template: "",
})
class MockLoginComponent {}

describe("LoginComponent", () => {
    let fixture: ComponentFixture<MockLoginComponent>;
    let component: MockLoginComponent;

    beforeEach(() => {
        const userServiceSpyObj = jasmine.createSpyObj("UserService", [
            "login",
        ]);
        const routerSpyObj = jasmine.createSpyObj("Router", ["navigate"]);

        TestBed.configureTestingModule({
            declarations: [MockLoginComponent],
            imports: [CommonModule, ReactiveFormsModule],
            providers: [
                { provide: UserService, useValue: userServiceSpyObj },
                { provide: Router, useValue: routerSpyObj },
            ],
        });

        fixture = TestBed.createComponent(MockLoginComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
