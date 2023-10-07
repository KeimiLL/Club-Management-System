import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { ErrorComponent } from "./error.component";

class MockActivatedRoute {
    queryParams = of({});
}

describe("ErrorComponent", () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ErrorComponent],
            providers: [
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
            ],
        });
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
