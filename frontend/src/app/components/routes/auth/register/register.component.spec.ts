import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteParamMap } from "../../../../shared/test-mocks/test-mocks";
import { AuthService } from "../auth.service";
import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
    let fixture: ComponentFixture<RegisterComponent>;
    let component: RegisterComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RegisterComponent,
            ],
            providers: [
                AuthService,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteParamMap,
                },
            ],
        });

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
