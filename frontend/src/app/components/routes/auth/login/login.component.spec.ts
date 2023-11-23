import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../../../../shared/test-mocks/test-mocks";
import { AuthService } from "../auth.service";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HttpClientTestingModule],
            providers: [
                AuthService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
