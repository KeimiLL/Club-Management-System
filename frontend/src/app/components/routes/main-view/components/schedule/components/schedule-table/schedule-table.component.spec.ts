import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScheduleTableComponent } from "./schedule-table.component";

describe("ScheduleTableComponent", () => {
    let fixture: ComponentFixture<ScheduleTableComponent>;
    let component: ScheduleTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScheduleTableComponent],
        });

        fixture = TestBed.createComponent(ScheduleTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
