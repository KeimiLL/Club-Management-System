import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamsContentComponent } from "./teams-content.component";

describe("TeamsContentComponent", () => {
    let component: TeamsContentComponent;
    let fixture: ComponentFixture<TeamsContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeamsContentComponent],
        });
        fixture = TestBed.createComponent(TeamsContentComponent);
        component = fixture.componentInstance;
        component.team = {
            name: "name",
            id: 1,
            coach: { user_id: 1, user_full_name: "Full Name" },
            players: [{ user_id: 1, user_full_name: "Full Name" }],
        };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
