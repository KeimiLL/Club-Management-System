import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchDetailsComponent } from "./match-details.component";

describe("MatchDetailsComponent", () => {
    let fixture: ComponentFixture<MatchDetailsComponent>;
    let component: MatchDetailsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatchDetailsComponent],
        });

        fixture = TestBed.createComponent(MatchDetailsComponent);
        component = fixture.componentInstance;
        component.matchDetails = {
            notes: "notes",
            date: "2023-11-19",
        };
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
