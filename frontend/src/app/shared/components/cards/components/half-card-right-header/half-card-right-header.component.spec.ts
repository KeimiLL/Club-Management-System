import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfCardRightHeaderComponent } from "./half-card-right-header.component";

describe("HalfCardRightHeaderComponent", () => {
    let component: HalfCardRightHeaderComponent;
    let fixture: ComponentFixture<HalfCardRightHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HalfCardRightHeaderComponent],
        });
        fixture = TestBed.createComponent(HalfCardRightHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
