import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchEventPopupComponent } from "./match-event-popup.component";

describe("MatchEventPopupComponent", () => {
    let component: MatchEventPopupComponent;
    let fixture: ComponentFixture<MatchEventPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatchEventPopupComponent],
        });
        fixture = TestBed.createComponent(MatchEventPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
