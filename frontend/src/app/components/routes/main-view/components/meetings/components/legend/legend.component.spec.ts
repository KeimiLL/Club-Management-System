import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LegendComponent } from "./legend.component";

describe("LegendComponent", () => {
    let fixture: ComponentFixture<LegendComponent>;
    let component: LegendComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        fixture = TestBed.createComponent(LegendComponent);
        component = fixture.componentInstance;
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
