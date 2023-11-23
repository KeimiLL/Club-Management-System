import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfCardRightHeaderComponent } from "./half-card-right-header.component";

describe("HalfCardRightHeaderComponent", () => {
    let fixture: ComponentFixture<HalfCardRightHeaderComponent>;
    let component: HalfCardRightHeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HalfCardRightHeaderComponent],
        });

        fixture = TestBed.createComponent(HalfCardRightHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
