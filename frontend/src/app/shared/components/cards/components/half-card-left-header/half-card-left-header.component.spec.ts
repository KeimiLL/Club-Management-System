import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfCardLeftHeaderComponent } from "./half-card-left-header.component";

describe("HalfCardLeftHeaderComponent", () => {
    let component: HalfCardLeftHeaderComponent;
    let fixture: ComponentFixture<HalfCardLeftHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HalfCardLeftHeaderComponent],
        });
        fixture = TestBed.createComponent(HalfCardLeftHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
