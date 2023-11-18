import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SchedulePopupComponent } from "./schedule-popup.component";

describe("SchedulePopupComponent", () => {
    let component: SchedulePopupComponent;
    let fixture: ComponentFixture<SchedulePopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SchedulePopupComponent],
        });
        fixture = TestBed.createComponent(SchedulePopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
