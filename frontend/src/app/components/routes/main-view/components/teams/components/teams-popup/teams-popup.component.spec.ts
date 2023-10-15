import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamsPopupComponent } from "./teams-popup.component";

describe("TeamsPopupComponent", () => {
    let component: TeamsPopupComponent;
    let fixture: ComponentFixture<TeamsPopupComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsPopupComponent],
        });
        fixture = TestBed.createComponent(TeamsPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
