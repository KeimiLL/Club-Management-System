import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfCardSectionComponent } from "./half-card-section.component";

describe("HalfCardSectionComponent", () => {
    let fixture: ComponentFixture<HalfCardSectionComponent>;
    let component: HalfCardSectionComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HalfCardSectionComponent],
        });

        fixture = TestBed.createComponent(HalfCardSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
