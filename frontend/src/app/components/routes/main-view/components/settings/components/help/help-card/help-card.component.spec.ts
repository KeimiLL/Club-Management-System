import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HelpCardComponent } from "./help-card.component";

describe("HelpCardComponent", () => {
    let fixture: ComponentFixture<HelpCardComponent>;
    let component: HelpCardComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HelpCardComponent],
        });

        fixture = TestBed.createComponent(HelpCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
