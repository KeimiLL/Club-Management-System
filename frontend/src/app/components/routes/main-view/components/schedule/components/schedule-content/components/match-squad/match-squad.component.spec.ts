import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchSquadComponent } from "./match-squad.component";

describe("MatchSquadComponent", () => {
    let component: MatchSquadComponent;
    let fixture: ComponentFixture<MatchSquadComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatchSquadComponent],
        });
        fixture = TestBed.createComponent(MatchSquadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
