import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";

describe("AuthComponent", () => {
    let fixture: ComponentFixture<AuthComponent>;
    let component: AuthComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, RouterModule],
        });

        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
