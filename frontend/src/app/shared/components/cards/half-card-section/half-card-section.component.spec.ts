import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfCardSectionComponent } from "./half-card-section.component";

describe("HalfCardSectionComponent", () => {
    let component: HalfCardSectionComponent;
    let fixture: ComponentFixture<HalfCardSectionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HalfCardSectionComponent],
        });
        fixture = TestBed.createComponent(HalfCardSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
