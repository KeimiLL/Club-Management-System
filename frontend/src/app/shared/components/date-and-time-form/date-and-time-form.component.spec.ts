import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DateAndTimeFormComponent } from "./date-and-time-form.component";

describe("DateAndTimeFormComponent", () => {
    let component: DateAndTimeFormComponent;
    let fixture: ComponentFixture<DateAndTimeFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DateAndTimeFormComponent],
        });
        fixture = TestBed.createComponent(DateAndTimeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
