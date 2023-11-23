import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DateComponent } from "./date.component";

describe("DateComponent", () => {
    let fixture: ComponentFixture<DateComponent>;
    let component: DateComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DateComponent],
        });

        fixture = TestBed.createComponent(DateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
