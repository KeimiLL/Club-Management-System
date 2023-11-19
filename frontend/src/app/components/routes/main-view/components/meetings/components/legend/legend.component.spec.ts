import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LegendComponent } from "./legend.component";

describe("LegendComponent", () => {
    let component: LegendComponent;
    let fixture: ComponentFixture<LegendComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        fixture = TestBed.createComponent(LegendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
