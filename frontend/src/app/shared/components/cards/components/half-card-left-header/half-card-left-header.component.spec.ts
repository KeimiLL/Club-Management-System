import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfCardLeftHeaderComponent } from "./half-card-left-header.component";

describe("HalfCardLeftHeaderComponent", () => {
    let fixture: ComponentFixture<HalfCardLeftHeaderComponent>;
    let component: HalfCardLeftHeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HalfCardLeftHeaderComponent],
        });

        fixture = TestBed.createComponent(HalfCardLeftHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
