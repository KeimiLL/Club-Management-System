import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { ActivatedRouteQueryParams } from "../../../shared/test-mocks/test-mocks";
import { ErrorComponent } from "./error.component";

describe("ErrorComponent", () => {
    let fixture: ComponentFixture<ErrorComponent>;
    let component: ErrorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ErrorComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteQueryParams,
                },
            ],
        });

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
